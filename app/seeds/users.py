from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password')
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password')
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password')
    layla = User(
        username='layla', email='layla@aa.io', password='password')
    chewy = User(
        username='chewy', email='chewy@aa.io', password='password')
    carlos = User(
        username='Carlos', email='carlos@gmail.com', password='password'
    )
    mayu = User(
        username='Mayu', email='mayu@hotmail.com', password='password'
    )
    alex = User(
        username='Alex', email='alex@gmail.com', password='password'
    )
    jordan = User(
        username='Jordan', email='jordan@yahoo.com', password='password'
    )
    taylor = User(
        username='Taylor', email='taylor@outlook.com', password='password'
    )

    db.session.add_all([demo, marnie, bobbie, layla, chewy, carlos, mayu, alex, jordan, taylor])

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
