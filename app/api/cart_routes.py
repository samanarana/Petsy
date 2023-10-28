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
@login_required

def add_to_cart():

    data = request.get_json()
    if "productId" not in data or "quantity" not in data or "price" not in data:
        return jsonify(status="error", error_type="data_missing", message="Required data not provided"), 400

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
    return jsonify(status="success", message="Item added to cart successfully", data={}), 201




# Remove a product from the cart
@cart_routes.route('/<int:productId>', methods=['DELETE'])
@login_required
def remove_from_cart(productId):
    cart_item = CartItem.query.filter_by(
        userId=current_user.id, productId=productId
    ).first()
    if not cart_item:
        return jsonify(status="error", error_type="not_found", message="Item not found"), 404
    if cart_item.quantity > 1:
        cart_item.quantity -= 1
    else:
        db.session.delete(cart_item)
    db.session.commit()
    return jsonify(status="success", message='Item updated in cart', data={}), 200




# Complete a purchase transaction
@cart_routes.route('/transaction', methods=['POST'])
@login_required
def complete_transaction():
    CartItem.query.filter_by(userId=current_user.id).delete()
    db.session.commit()
    return jsonify(status="success", message="Transaction completed", data={}), 200


# Clear the cart
@cart_routes.route('/clear', methods=['DELETE'])
@login_required
def delete_all_items():
    CartItem.query.filter_by(userId=current_user.id).delete()
    db.session.commit()
    return jsonify(status="success", message="Cart cleared", data={}), 200


@cart_routes.route('/<int:productId>', methods=['PATCH'])
@login_required
def update_cart_item_quantity(productId):
    data = request.get_json()

    # Validate if "quantity" is provided in the request
    if "quantity" not in data:
        return jsonify(status="error", error_type="data_missing", message="Quantity not provided"), 400

    # Look for the item in the user's cart
    cart_item = CartItem.query.filter_by(userId=current_user.id, productId=productId).first()
    if not cart_item:
        return jsonify(status="error", error_type="not_found", message="Item not found in cart"), 404

    # Update the quantity
    cart_item.quantity = data["quantity"]

    db.session.commit()

    return jsonify(status="success", message="Item quantity updated successfully", data={}), 200
