from app.models import db, ProductImage, environment, SCHEMA
from sqlalchemy.sql import text

def seed_productimages():
    image1 = ProductImage(productId=1, imgUrl="https://res.cloudinary.com/ddlkhhzk0/image/upload/v1697576419/71fTdweakrL_owbaxi.jpg")
    image2 = ProductImage(productId=2, imgUrl="https://res.cloudinary.com/ddlkhhzk0/image/upload/v1697576476/shutterstock_1552062329-scaled_gy7hy0.jpg")
    image3 = ProductImage(productId=3,imgUrl="https://res.cloudinary.com/ddlkhhzk0/image/upload/v1697576588/its-a-fish_d4qey0.jpg")
    image4 = ProductImage(productId=4, imgUrl="https://res.cloudinary.com/ddlkhhzk0/image/upload/v1697576616/202856_standard_8rBSzrY_t900x600_jburdl.jpg")
    image5 = ProductImage(productId=5, imgUrl="https://res.cloudinary.com/ddlkhhzk0/image/upload/v1697576690/hamster-driving-car-jean-michel-labat_yzajc0.jpg")

    db.session.add(image1)
    db.session.add(image2)
    db.session.add(image3)
    db.session.add(image4)
    db.session.add(image5)

    db.session.commit()

def undo_productimages():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM productsimages"))

    db.session.commit()
