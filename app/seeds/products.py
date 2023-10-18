from app.models import db, Product, environment, SCHEMA
from sqlalchemy.sql import text

def seed_products():
    product1 = Product(userId=1, productName='Cat Skateboard', description="Tiny Skateboard for kittens to ride around town", price=79.02,imgUrl="https://res.cloudinary.com/ddlkhhzk0/image/upload/v1697576419/71fTdweakrL_owbaxi.jpg", category="Travel", quantity=50)
    product2 = Product(userId=2, productName='Dog Scooter', description="A scooter for all dogs of all shapes and sizes", price=89.55, imgUrl="https://res.cloudinary.com/ddlkhhzk0/image/upload/v1697576476/shutterstock_1552062329-scaled_gy7hy0.jpg", category="Travel", quantity=40)
    product3 = Product(userId=3, productName='Fish Bicycle', description="A stationary bike for your fish tank. Fish love to ride bikes", price=49.99, imgUrl="https://res.cloudinary.com/ddlkhhzk0/image/upload/v1697576588/its-a-fish_d4qey0.jpg", category="Travel", quantity=30)
    product4 = Product(userId=4, productName='Bird unicycle', description="A little unicycle to cycle around town", price=59.79, imgUrl="https://res.cloudinary.com/ddlkhhzk0/image/upload/v1697576616/202856_standard_8rBSzrY_t900x600_jburdl.jpg", category="Travel", quantity=20)
    product5 = Product(userId=5, productName='Hamster Car', description="A tiny car for your hamster to zoom around.", price=39.01, imgUrl="https://res.cloudinary.com/ddlkhhzk0/image/upload/v1697576690/hamster-driving-car-jean-michel-labat_yzajc0.jpg", category="Travel", quantity=10)

    db.session.add(product1)
    db.session.add(product2)
    db.session.add(product3)
    db.session.add(product4)
    db.session.add(product5)

    db.session.commit()

def undo_products():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM products"))

    db.session.commit()
