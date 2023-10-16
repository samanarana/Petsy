from app.models import db, Review
from datetime import datetime

def seed_reviews():
    review1 = Review(userId=1, productId=1, description="I would totally buy this again", rating=5, dateCreated=datetime.now())
    review2 = Review(userId=2, productId=1, description="Good quality but my cat wasn't interested.", rating=3, dateCreated=datetime.now())
    review3 = Review(userId=1, productId=2, description="My dog loves this!", rating=5, dateCreated=datetime.now())
    review4 = Review(userId=3, productId=3, description="Looks great in my aquarium.", rating=4, dateCreated=datetime.now())
    review5 = Review(userId=4, productId=4, description="This broke within a week.", rating=1, dateCreated=datetime.now())

    db.session.add(review1)
    db.session.add(review2)
    db.session.add(review3)
    db.session.add(review4)
    db.session.add(review5)

    db.session.commit()

def undo_reviews():
    db.session.execute("DELETE FROM reviews")
    db.session.commit()
