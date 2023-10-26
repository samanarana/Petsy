from flask import Blueprint, request, jsonify, render_template, redirect, url_for
from flask_login import login_required, current_user
from app.models import Review
from app import db
from app.forms.review_form import ReviewForm


review_routes = Blueprint('reviews', __name__)


# Update a specific review
@review_routes.route('/<int:reviewId>', methods=['PUT'])
@login_required
def update_review(reviewId):
    review = Review.query.get(reviewId)
    if not review:
        return ('Review not found', 404)

    if review.userId != current_user.id:
        return ('Not authorized to update this review', 403)

    data = request.get_json()

    review.description = data.get('description', review.description)
    review.rating = data.get('rating', review.rating)

    db.session.commit()

    return review.to_dict()

# Delete a specific review
@review_routes.route('/<int:reviewId>', methods=['DELETE'])
@login_required
def delete_review(reviewId):
    review = Review.query.get(reviewId)
    if not review:
        return ('Review not found', 404)

    if review.userId != current_user.id:
        return ('Not authorized to delete this review', 403)

    db.session.delete(review)
    db.session.commit()

    return {'message': 'Review deleted'}

# Get all the review from a logged in user
@review_routes.route('/user', methods=['GET'])
@login_required
def get_user_reviews():
    user_reviews = Review.query.filter_by(userId=current_user.id).all()
    return jsonify({'user_reviews': [review.to_dict() for review in user_reviews]})

@review_routes.route('/<int:reviewId>', methods=['GET'])
@login_required
def get_review(reviewId):
    review = Review.query.get(reviewId)
    if not review:
        return ('Review not found', 404)

    if review.userId != current_user.id:
        return ('Not authorized to view this review', 403)

    return jsonify(review.to_dict())
