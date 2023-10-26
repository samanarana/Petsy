from app.models import db, Review, environment, SCHEMA
from datetime import datetime

def seed_reviews():
    review1 = Review(userId=1, productId=1, description="I would totally buy this again", rating=5, dateCreated=datetime.now())
    review2 = Review(userId=2, productId=1, description="Good quality but my cat wasn't interested.", rating=3, dateCreated=datetime.now())
    review3 = Review(userId=1, productId=2, description="My dog loves this!", rating=5, dateCreated=datetime.now())
    review4 = Review(userId=3, productId=3, description="Looks great in my aquarium.", rating=4, dateCreated=datetime.now())
    review5 = Review(userId=4, productId=4, description="This broke within a week.", rating=1, dateCreated=datetime.now())

    review6 = Review(userId=1, productId=3, description="My fish seems more active with this.", rating=4, dateCreated=datetime.now())
    review7 = Review(userId=1, productId=5, description="A fun toy for my hamster. He seems to enjoy it!", rating=5, dateCreated=datetime.now())
    review8 = Review(userId=2, productId=6, description="Not what I expected but it's a good laugh.", rating=3, dateCreated=datetime.now())
    review9 = Review(userId=2, productId=7, description="Perfect for summer days.", rating=5, dateCreated=datetime.now())

    review10 = Review(userId=3, productId=1, description="The skateboard is cute but my cat doesn't care for it.", rating=3, dateCreated=datetime.now())
    review11 = Review(userId=3, productId=9, description="This keeps my cat entertained for hours.", rating=5, dateCreated=datetime.now())

    review12 = Review(userId=5, productId=2, description="Pretty good quality. My dog seems comfortable.", rating=4, dateCreated=datetime.now())
    review13 = Review(userId=5, productId=8, description="The bed is perfect for my older dog.", rating=5, dateCreated=datetime.now())

    db.session.add_all([review1, review2, review3, review4, review5, review6, review7, review8, review9, review10, review11, review12, review13])

    db.session.commit()

def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM reviews")
    db.session.commit()
