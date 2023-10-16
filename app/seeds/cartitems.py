from app.models import db, CartItem, environment, SCHEMA
from sqlalchemy.sql import text

def seed_cartitems():

    cartitem1 = CartItem(userId=1, productId=1, quantity=2, price=79)
    cartitem2 = CartItem(userId=1, productId=2, quantity=1, price=89)
    cartitem3 = CartItem(userId=1, productId=5, quantity=3, price=39)
    cartitem4 = CartItem(userId=2, productId=3, quantity=2, price=49)
    cartitem5 = CartItem(userId=2, productId=4, quantity=1, price=59)
    cartitem6 = CartItem(userId=2, productId=5, quantity=2, price=39)
    cartitem7 = CartItem(userId=3, productId=1, quantity=1, price=79)
    cartitem8 = CartItem(userId=3, productId=4, quantity=2, price=59)


    cartitems = [cartitem1, cartitem2, cartitem3, cartitem4, cartitem5, cartitem6, cartitem7, cartitem8]

    db.session.add_all(cartitems)
    db.session.commit()

def undo_cartitems():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.cartitems RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM cartitems"))
    db.session.commit()
