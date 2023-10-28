from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Order, OrderItem, Product, Review, CartItem
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

#Get that order placed -- yass queen.
@order_routes.route('/checkout', methods=['POST'])
@login_required
def checkout():
    cart_items = CartItem.query.filter_by(userId=current_user.id).all()

    if not cart_items:
        return jsonify(status="error", error_type="empty_cart", message="Your cart is empty"), 400

    #Update this
    total_price = sum(item.price * item.quantity for item in cart_items)

    #Hard-coded Placeholders for Data + Error Handler
    shipping_address = 'The Forbidden Cats Treehouse, Sky Island'
    billing_address = 'The Forbidden Cats Treehouse, Sky Island'
    payment_method = 'A handful of Acorns'
    if not all([shipping_address, billing_address, payment_method]):
        return jsonify(status="error", error_type="missing_data", message="Hard-coded Shipping and Billing Details-related error"), 400

    new_order = Order(
        userId=current_user.id,
        totalPrice=total_price,
        shippingAddress=shipping_address,
        billingAddress=billing_address,
        paymentMethod=payment_method,
        orderStatus="processing"
    )

    db.session.add(new_order)
    db.session.commit()

    #May need to adjust this to actually just use clearCart also.
    for cart_item in cart_items:
        order_item = OrderItem(orderId=new_order.id, productId=cart_item.productId)
        db.session.add(order_item)
        db.session.delete(cart_item)

    db.session.commit()

    return jsonify(status="success", message="Checkout successful", data=new_order.to_dict()), 200
