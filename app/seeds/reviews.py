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
    review12 = Review(userId=5, productId=2, description="Pretty good quality. i would buy again bark bark", rating=4, dateCreated=datetime.now())
    review13 = Review(userId=5, productId=8, description="The bed is perfect. I sleep all night now.", rating=5, dateCreated=datetime(2023, 8, 11))
    review14 = Review(userId=6, productId=3, description="This is a unique product. I've never seen anything like this for a fish. I bought this for my whole family", rating=4, dateCreated=datetime.now())
    review15 = Review(userId=7, productId=4, description="The unicycle looks sturdy but im is still learning how to use it.", rating=3, dateCreated=datetime.now())
    review16 = Review(userId=8, productId=2, description="It's a bit pricey but the quality is top-notch.", rating=5, dateCreated=datetime.now())
    review17 = Review(userId=8, productId=5, description="Bought this. It's a hit!", rating=5, dateCreated=datetime.now())
    review18 = Review(userId=9, productId=1, description="Innovative product but not sure if it's practical.", rating=3, dateCreated=datetime(2022, 8, 11))
    review19 = Review(userId=9, productId=6, description="I am an alligator and i think this looks cool!", rating=4, dateCreated=datetime(2023, 9, 22))
    review20 = Review(userId=10, productId=7, description="The hammock is so comfortable. I bouight one and plan on gifting this to all my freinds.", rating=4, dateCreated=datetime.now())
    review21 = Review(userId=10, productId=9, description="This scratcher is durable and my cat loves it.", rating=5, dateCreated=datetime.now())
    review22 = Review(userId=11, productId=12, description="The anxiety wrap works wonders for my dog during storms.", rating=5, dateCreated=datetime(2023, 2, 6))
    review23 = Review(userId=12, productId=14, description="These vitamins healthy and active.", rating=5, dateCreated=datetime(2023, 7, 7))
    review24 = Review(userId=13, productId=13, description="The conditioner adds a nice shine to myfeathers.", rating=5, dateCreated=datetime.now())
    review25 = Review(userId=14, productId=15, description="The shampoo smells great and leaves my fur soft.", rating=4, dateCreated=datetime(2023, 9, 11))
    review26 = Review(userId=11, productId=1, description="I felt so cool riding this around the house!", rating=5, dateCreated=datetime(2023, 9, 15))
    review27 = Review(userId=12, productId=2, description="Scooting around the park was fun, but I still prefer running!", rating=3, dateCreated=datetime(2023, 8, 10))
    review28 = Review(userId=13, productId=3, description="I don't get the point, but it's a nice decoration in my tank.", rating=3, dateCreated=datetime(2023, 7, 5))
    review29 = Review(userId=14, productId=4, description="I'd rather fly, but this is a fun change of pace.", rating=4, dateCreated=datetime(2023, 6, 20))
    review30 = Review(userId=10, productId=5, description="Zooming around in this car is the highlight of my day!", rating=5, dateCreated=datetime(2023, 5, 15))
    review31 = Review(userId=9, productId=10, description="I am sleeping thrugh the night for the first time in 20 years. God Bless this bed!", rating=5, dateCreated=datetime(2023, 7, 15))
    review32 = Review(userId=10, productId=10, description="Thank the lord for this bedding. I was going to devorce my wife before getting this bedding. Now we are the happiest hamster couple in sunny Colorado Springs!", rating=5, dateCreated=datetime(2023, 5, 15))

    db.session.add_all([
        review1, review2, review3, review4, review5,
        review6, review7, review8, review9, review10,
        review11, review12, review13, review14, review15,
        review16, review17, review18, review19, review20,
        review21, review22, review23, review24, review25,
        review26, review27, review28, review29, review30, review31, review32
    ])

    db.session.commit()

def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM reviews")
    db.session.commit()
