from app.models import db, Product, environment, SCHEMA
from sqlalchemy.sql import text

def seed_products():
    product1 = Product(userId=1, productName='Cat Skateboard', description="Tiny Skateboard for kittens to ride around town", price=79.02, category="Toys", quantity=50)
    product2 = Product(userId=2, productName='Dog Scooter', description="A scooter for all dogs of all shapes and sizes", price=89.55, category="Toys", quantity=40)
    product3 = Product(userId=3, productName='Fish Bicycle', description="A stationary bike for your fish tank. Fish love to ride bikes", price=49.99, category="Toys", quantity=30)
    product4 = Product(userId=4, productName='Bird unicycle', description="A little unicycle to cycle around town", price=59.79, category="Toys", quantity=20)
    product5 = Product(userId=5, productName='Hamster Car', description="A tiny car for your hamster to zoom around.", price=39.01, category="Toys", quantity=10)
    product6 = Product(userId=6, productName='Alligator Rollerblades', description="A set of rollerblades designed for your pet alligator.", price=65.00, category="Travel", quantity=15)
    product7 = Product(userId=2, productName='Alligator Hammock', description="Hammock for your Alligator to lounge on", price=122.99, category="Home", quantity=8)
    product8 = Product(userId=4, productName='Normal Dog Bed', description="Just a normal dog bed for dogs with arthritis", price=89.99, category="Home", quantity=5)
    product9 = Product(userId=2, productName='Cat Scratch Thing', description="Nice thing for your cat scratch", price=34.99, category="Toys", quantity=10)
    product10 = Product(userId=3, productName='Hamster Bedding', description="Soft and absorbent bedding for your hamster's home", price=10.99, category="Home", quantity=6)
    product11 = Product(userId=6, productName='Dog House', description="Classic wooden dog house for your pet's outdoor shelter", price=140.00, category="Home", quantity=10)
    product12 = Product(userId=2, productName='Dog Anxiety Wrap', description="A wrap that applies gentle pressure to reduce anxiety in dogs.", price=39.99, category="Accessories", quantity=40)
    product13 = Product(userId=2, productName='Bird Feather Conditioner', description="A conditioner that keeps your bird's feathers shiny and healthy.", price=12.99, category="Accessories", quantity=4)
    product14 = Product(userId=4, productName='Hamster Vitamins', description="Vitamins to supplement your hamster's diet and ensure proper nutrition.", price=8.99, category="Food", quantity=7)
    product15 = Product(userId=7, productName='Doggie Shampoo', description="A conditioner that keeps your Dog's hair shiny and healthy.", price=12.99, category="Accessories", quantity=28)
    product16 = Product(userId=1, productName='Leather Dog Collar', description="High-quality leather collar for dogs, adjustable for the perfect fit.", price=24.99, category="Accessories", quantity=50)
    # product17 = Product(userId=2, productName='Cat Collar with Bell', description="Cute collar for cats with a bell to keep track of your kitty.", price=9.99, category="Accessories", quantity=100)
    # product18 = Product(userId=3, productName='LED Dog Collar', description="LED collar to keep your dog visible and safe during nighttime walks.", price=19.99, category="Accessories", quantity=75)
    # product19 = Product(userId=4, productName='Personalized Pet ID Tag', description="Customizable ID tag to help identify your pet if they get lost.", price=14.99, category="Accessories", quantity=90)
    # product20 = Product(userId=5, productName='Catnip Filled Cat Toy', description="Fun toy filled with catnip to keep your cat entertained.", price=4.99, category="Accessories", quantity=120)
    # product21 = Product(userId=6, productName='Dog Bandana', description="Stylish bandana for dogs, perfect for special occasions.", price=7.99, category="Accessories", quantity=50)
    # product22 = Product(userId=4, productName='Parrot Feathers Accessory', description="Colorful feathers to add to your parrot's cage.", price=5.99, category="Accessories", quantity=40)
    # product23 = Product(userId=5, productName='Rabbit Bow Tie', description="Bow tie for rabbits.", price=9.99, category="Accessories", quantity=35)



    db.session.add_all([product1, product2, product3, product4, product5, product6, product7, product8, product9, product10,
                        product11, product12, product13, product14, product15, product16])

    db.session.commit()

def undo_products():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM products"))

    db.session.commit()
