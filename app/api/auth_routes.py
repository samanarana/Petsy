from flask import Blueprint, jsonify, session, request
from werkzeug.security import check_password_hash
from app.models import User, db
from app.forms import LoginForm
from app.forms import SignUpForm
from flask_login import current_user, login_user, logout_user, login_required
import re

auth_routes = Blueprint('auth', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@auth_routes.route('/')
def authenticate():
    """
    Authenticates a user.
    """
    if current_user.is_authenticated:
        return current_user.to_dict()
    return {'errors': ['Unauthorized']}


@auth_routes.route('/login', methods=['POST'])
def login():
    """
    Logs a user in
    """
    form = LoginForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # Add the user to the session, we are logged in!
        user = User.query.filter(User.email == form.data['email']).first()
        if user:
            # Check if the given password matches the hashed password in the database
            if check_password_hash(user.password, form.data['password']):
                login_user(user)
                return user.to_dict()
            else:
                return {'errors': {'password': 'Password is incorrect'}}, 401
        else:
            return {'errors': {'email': 'Email not found'}}, 401

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/logout')
def logout():
    """
    Logs a user out
    """
    logout_user()
    return {'message': 'User logged out'}


@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    if current_user.is_authenticated:
        return {'message': 'User already logged in.'}, 400

    form = SignUpForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        email_regex = r"^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$"
        if not re.match(email_regex, form.data['email'], re.IGNORECASE):
            return jsonify(errors=['Please enter a valid email address.']), 400

        if len(form.data['password']) < 6:
            return jsonify(errors=['Password should be at least 6 characters.']), 400
        user = User(
            username=form.data['username'],
            email=form.data['email'],
            password=form.data['password']
        )

        existing_email = User.query.filter_by(email=form.data['email']).first()
        existing_username = User.query.filter_by(username=form.data['username']).first()

        if existing_email:
            return {'errors': ['Email is already in use.']}, 401

        if existing_username:
            return {'errors': ['Username is already taken.']}, 401

        db.session.add(user)
        db.session.commit()
        login_user(user)
        return user.to_dict()

    error_messages = [error for errors in form.errors.values() for error in errors]
    return jsonify(errors=error_messages), 401


@auth_routes.route('/unauthorized')
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {'errors': ['Unauthorized']}, 401
