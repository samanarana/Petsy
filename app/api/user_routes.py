from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, Favorite
from app import db

user_routes = Blueprint('users', __name__)

@user_routes.route('/<int:userId>/favorites', methods=['POST'])
@login_required
def add_favorite(userId):
    """
    Add a new favorite to a userId 
    """
    data = request.get_json()
    new_favorite = Favorite(
        userId=userId,
        productId=data['productId']
    )

    db.session.add(new_favorite)
    db.session.commit()

    return new_favorite.to_dict()

@user_routes.route('/<int:userId>/favorites/<int:productId>', methods=['DELETE'])
@login_required
def remove_favorite(userId, productId):
    favorite = Favorite.query.filter_by(userId=userId, productId=productId).first()

    if not favorite:
        return jsonify({"message": "Favorite not found"}), 404
    
    db.session.delete(favorite)
    db.session.commit()

    return {'message': 'Favorite removed'}

@user_routes.route('/<int:userId>/favorites', methods=['GET'])
@login_required
def get_favorites(userId):
    """
    Return all favorites for a userId
    """
    if userId != current_user.id:
        return jsonify({"message": "Unauthorized"})
    
    favorites = Favorite.query.filter_by(userId=userId).all()
    return { 'favorites':  [favorite.to_dict() for favorite in favorites]}

@user_routes.route('/<int:userId>')
@login_required
def user(userId):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(userId)
    return user.to_dict()

@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


