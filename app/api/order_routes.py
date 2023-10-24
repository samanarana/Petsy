from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Order, OrderItem, Product, Review
from app import db

order_routes = Blueprint('orders', __name__, url_prefix='/api/orders')

# All orders
@order_routes.route('/')
@login_required
def get_all_orders():
    orders = Order.query.all()
    return jsonify([order.to_dict() for order in orders])

# all orders of a user logged in
@order_routes.route('/users')
@login_required
def get_user_orders():
    orders = Order.query.filter(Order.userId == current_user.id).all()
    return jsonify([order.to_dict() for order in orders])

@order_routes.route('/products/<int:productId>')
@login_required
def get_product_orders(productId):
    order_items = OrderItem.query.filter(OrderItem.productId == productId).all()
    orders = [order_item.order for order_item in order_items]
    return jsonify([order.to_dict() for order in orders])

#get all the products purchased by current user
@order_routes.route('/users/products')
@login_required
def get_user_products():
    # Get all orders
    orders = Order.query.filter(Order.userId == current_user.id).all()


    products = []
    # reviews = []
    for order in orders:
        order_items = OrderItem.query.filter(OrderItem.orderId == order.id)
        for order_item in order_items:
            product = Product.query.get(order_item.productId)
            products.append(product)
            # review = Review.query.filter(Review.productId == product and Review.userId == current_user.id).first()
            # reviews.append(review)



    return jsonify([product.to_dict() for product in products])

#get all the products the current user has not reviewed yet
@order_routes.route('/user/products/reviewed')
@login_required
def get_user_reviews():
    orders = Order.query.filter(Order.userId == current_user.id).all()


    products = []
    for order in orders:
        order_items = OrderItem.query.filter(OrderItem.orderId == order.id)
        for order_item in order_items:
            product = Product.query.get(order_item.productId)
            if not Review.query.filter(Review.productId == product.id , Review.userId == current_user.id).first():
                products.append(product)
    return jsonify([product.to_dict() for product in products])
