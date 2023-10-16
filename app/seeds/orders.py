from app.models import db, Order, environment, SCHEMA

def seed_orders():
    order1 = Order(userId=1,
                   totalPrice=150.0,
                   shippingAddress="1604 Lakewood dr. Slidell, LA 70458",
                   billingAddress="1604 Lakewood dr. Slidell, LA 70458",
                   paymentMethod="Credit Card",
                   orderStatus="shipped")

    order2 = Order(userId=2,
                   totalPrice=95.0,
                   shippingAddress="2224 Lapeyrouse st. New Orleans, LA 70119",
                   billingAddress="2224 Lapeyrouse st. New Orleans, LA 70119",
                   paymentMethod="Debit Card",
                   orderStatus="pending")

    order3 = Order(userId=3,
                   totalPrice=50.0,
                   shippingAddress="515 Dumaine st. New Orleans, LA 70119",
                   billingAddress="515 Dumaine st. New Orleans, LA 70119",
                   paymentMethod="PayPal",
                   orderStatus="pending")

    order4 = Order(userId=4,
                   totalPrice=75.0,
                   shippingAddress="3735 Ulloa St. New Orleans, LA 70119",
                   billingAddress="3735 Ulloa St. New Orleans, LA 70119",
                   paymentMethod="Credit Card",
                   orderStatus="shipped")

    order5 = Order(userId=5,
                   totalPrice=120.0,
                   shippingAddress="524 Jefferson Ave, New Orleans, LA 70115",
                   billingAddress="524 Jefferson Ave, New Orleans, LA 70115",
                   paymentMethod="Debit Card",
                   orderStatus="processing")

    db.session.add(order1)
    db.session.add(order2)
    db.session.add(order3)
    db.session.add(order4)
    db.session.add(order5)

    db.session.commit()

def undo_orders():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.orders RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM orders")
    db.session.commit()
