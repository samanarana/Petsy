from app.models import OrderItem, db, environment, SCHEMA
from sqlalchemy.sql import text

def seed_orderitems():

    orderitem1 = OrderItem(orderId=1, productId=1)
    orderitem2 = OrderItem(orderId=1, productId=2)
    orderitem3 = OrderItem(orderId=2, productId=3)
    orderitem4 = OrderItem(orderId=3, productId=4)
    orderitem5 = OrderItem(orderId=4, productId=1)
    orderitem6 = OrderItem(orderId=5, productId=2)
    orderitem7 = OrderItem(orderId=5, productId=5)

    orderitems = [orderitem1, orderitem2, orderitem3, orderitem4, orderitem5, orderitem6, orderitem7]

    db.session.add_all(orderitems)
    db.session.commit()

def undo_orderitems():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.orderitems RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM orderitems"))
    db.session.commit()
