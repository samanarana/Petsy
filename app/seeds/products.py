from app.models import db, Product, environment, SCHEMA
from sqlalchemy.sql import text

def seed_products():
    product1 = Product(userId=1, productName='Cat Skateboard', description="Tiny Skateboard for kittens to ride around town", price=79,imgUrl="/images/skateboard.png")
    product2 = Product(userId=2, productName='Dog Scooter', description="A scooter for all dogs of all shapes and sizes", price=89, imgUrl="/images/dogscooter.png")
    product3 = Product(userId=3, productName='Fish Bicycle', description="A stationary bike for your fish tank. Fish love to ride bikes", price=49, imgUrl="/images/fishbicycle.png")
    product4 = Product(userId=4, productName='Bird unicycle', description="A little unicycle to cycle around town", price=59, imgUrl="/images/birdunicycle.png")
    product5 = Product(userId=5, productName='Hamster Car', description="A tiny car for your hamster to zoom around.", price=39, imgUrl="/images/hamstercar.png")

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
