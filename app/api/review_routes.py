from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Review
from app import db

review_routes = Blueprint('reviews', __name__)

# Retrieve reviews for a specific product
@review_routes.route('/products/<int:productId>/reviews', methods=['GET'])
def get_reviews(productId):
    reviews = Review.query.filter_by(productId=productId).all()
    return {'reviews': [review.to_dict() for review in reviews]}


# Add a review for a specific product (for authenticated users)
@review_routes.route('/products/<int:productId>/reviews', methods=['POST'])
@login_required
def add_review(productId):
    data = request.get_json()

    new_review = Review(
        userId=data['userId'],
        productId=productId,
        description=data['description'],
        rating=data['rating'],
        dateCreated=db.func.now()
    )

    db.session.add(new_review)
    db.session.commit()

    return new_review.to_dict()

# Update a specific review (for authenticated users)
@review_routes.route('/reviews/<int:reviewId>', methods=['PUT'])
@login_required
def update_review(reviewId):
    review = Review.query.get(reviewId)
    if not review:
        return ('Review not found', 404)

    data = request.get_json()

    review.description = data.get('description', review.description)
    review.rating = data.get('rating', review.rating)

    db.session.commit()

    return review.to_dict()

# Delete a specific review (for authenticated users)
@review_routes.route('/reviews/<int:reviewId>', methods=['DELETE'])
@login_required
def delete_review(reviewId):
    review = Review.query.get(reviewId)
    if not review:
        return ('Review not found', 404)

    db.session.delete(review)
    db.session.commit()

    return {'message': 'Review deleted'}
