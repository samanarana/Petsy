from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import CartItems
from app import db


cart_routes = Blueprint('cart', __name__)


# Retrieve all products in the user's cart
@cart_routes.route('/users/<int:userId>/cart', methods=['GET'])
@login_required
def view_cart(userId):
    if userId != current_user.id:
        return jsonify({"message": "Unauthorized"}), 401

    cart_items = CartItems.query.filter_by(userId=userId).all()
    return {'cart': [item.to_dict() for item in cart_items]}


# Add a product to the cart
@cart_routes.route('/cart', methods=['POST'])
@login_required
def add_to_cart():
    data = request.get_json()

    new_item = CartItems(
        userId=current_user.id,
        productId=data['productId'],
        quantity=data['quantity'],
        price=data['price']
    )

    db.session.add(new_item)
    db.session.commit()

    return new_item.to_dict()


# Remove a product from the cart
@cart_routes.route('/cart/<int:productId>', methods=['DELETE'])
@login_required
def remove_from_cart(productId):
    item = CartItems.query.filter_by(userId=current_user.id, productId=productId).first()

    if not item:
        return jsonify({"message": "Item not found"})

    db.session.delete(item)
    db.session.commit()

    return {'message': 'Item removed'}



# Complete a purchase transaction
@cart_routes.route('/cart/transaction', methods=['POST'])
@login_required
def complete_transaction():

    # transaction logic here

    CartItems.query.filter_by(userId=current_user.id).delete()
    db.session.commit()

    return {'message': 'Transaction completed'}, 200
