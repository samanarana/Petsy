from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import CartItem
from app import db


cart_routes = Blueprint('cart', __name__)


# Retrieve all products in the user's cart
@cart_routes.route('/', methods=['GET'])
@login_required
def view_cart():
    cart_items = CartItem.query.filter_by(userId=current_user.id).all()
    return {'cart': [item.to_dict() for item in cart_items]}


# Add a product to the cart
@cart_routes.route("", methods=["POST"])
def add_to_cart():
    data = request.get_json()
    print(data)
    if "productId" not in data or "quantity" not in data or "price" not in data:
        return jsonify({"error": "Missing data"}), 400

    # Check if the item is already in the cart and update quantity
    cart_item = CartItem.query.filter_by(
        userId=current_user.id, productId=data["productId"]
    ).first()

    if cart_item:
        cart_item.quantity += data["quantity"]
    else:
        cart_item = CartItem(
            userId=current_user.id,
            productId=data["productId"],
            quantity=data["quantity"],
            price=data["price"],
        )

    db.session.add(cart_item)
    db.session.commit()
    return jsonify({"message": "Item added to cart successfully"}), 201



# Remove a product from the cart
@cart_routes.route('/<int:productId>', methods=['DELETE'])
@login_required
def remove_from_cart(productId):
    cart_item = CartItem.query.filter_by(
        userId=current_user.id, productId=productId
    ).first()

    if not cart_item:
        return jsonify(success=False, message="Item not found")

    if cart_item.quantity > 1:
        cart_item.quantity -= 1
    else:
        db.session.delete(cart_item)

    db.session.commit()
    return jsonify(success=True, message='Item updated in cart')



# Complete a purchase transaction
@cart_routes.route('/transaction', methods=['POST'])
@login_required
def complete_transaction():

    # transaction logic here

    CartItem.query.filter_by(userId=current_user.id).delete()
    db.session.commit()

    return {'message': 'Transaction completed'}, 200
