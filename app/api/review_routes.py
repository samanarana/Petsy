from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
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
        userId=current_user.id,
        productId=productId,
        description=data['description'],
        rating=data['rating'],
        dateCreated=db.func.now()
    )

    db.session.add(new_review)
    db.session.commit()

    return new_review.to_dict()

# Update a specific review (for authenticated users)
@review_routes.route('/<int:reviewId>', methods=['PUT'])
@login_required
def update_review(reviewId):
    review = Review.query.get(reviewId)
    if not review:
        return ('Review not found', 404)

    if review.userId != current_user.id:
        return ('Not authorized to delete this review', 403)

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

    if review.userId != current_user.id:
        return ('Not authorized to delete this review', 403)

    db.session.delete(review)
    db.session.commit()

    return {'message': 'Review deleted'}

# Get all the review from a logged in user
@review_routes.route('/current', methods=['GET'])
@login_required
def get_user_reviews():
    user_id = current_user.id
    user_products = Review.query.filter_by(userId=user_id).all()

    return jsonify({'user_reviews': [product.to_dict() for product in user_products]})
