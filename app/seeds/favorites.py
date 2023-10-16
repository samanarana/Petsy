from app.models import db, Favorite, environment, SCHEMA

def seed_favorites():
    favorite1 = Favorite(userId=1, productId=1)
    favorite2 = Favorite(userId=2, productId=2)
    favorite3 = Favorite(userId=2, productId=3)
    favorite4 = Favorite(userId=3, productId=4)


    favorites = [favorite1, favorite2, favorite3, favorite4]

    db.session.add_all(favorites)
    db.session.commit()

def undo_favorites():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.favorites RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM favorites")
    db.session.commit()
