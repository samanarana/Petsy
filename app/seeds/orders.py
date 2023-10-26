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
    order6 = Order(userId=6,
                   totalPrice=180.0,
                   shippingAddress="123 Maple St, Baton Rouge, LA 70801",
                   billingAddress="123 Maple St, Baton Rouge, LA 70801",
                   paymentMethod="Credit Card",
                   orderStatus="shipped")

    order7 = Order(userId=7,
                   totalPrice=210.0,
                   shippingAddress="456 Oak Ave, Shreveport, LA 71101",
                   billingAddress="890 Pine Rd, Shreveport, LA 71102",
                   paymentMethod="PayPal",
                   orderStatus="pending")

    order8 = Order(userId=8,
                   totalPrice=60.0,
                   shippingAddress="789 Birch Blvd, Lafayette, LA 70501",
                   billingAddress="789 Birch Blvd, Lafayette, LA 70501",
                   paymentMethod="Debit Card",
                   orderStatus="processing")

    order9 = Order(userId=9,
                   totalPrice=300.0,
                   shippingAddress="159 Elm Dr, Lake Charles, LA 70601",
                   billingAddress="321 Cedar Ct, Lake Charles, LA 70602",
                   paymentMethod="Credit Card",
                   orderStatus="shipped")

    order10 = Order(userId=10,
                    totalPrice=110.0,
                    shippingAddress="654 Poplar Pl, Monroe, LA 71201",
                    billingAddress="654 Poplar Pl, Monroe, LA 71201",
                    paymentMethod="PayPal",
                    orderStatus="processing")

    db.session.add_all([order1, order2, order3, order4, order5, order6, order7, order8, order9, order10])


    db.session.commit()

def undo_orders():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.orders RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM orders")
    db.session.commit()
