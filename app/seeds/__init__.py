from flask.cli import AppGroup
from .users import seed_users, undo_users
from .orders import seed_orders, undo_orders
from .products import seed_products, undo_products
from .reviews import seed_reviews, undo_reviews
from .cartitems import seed_cartitems, undo_cartitems
from .orderitems import seed_orderitems, undo_orderitems
from .favorites import seed_favorites, undo_favorites

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_users()
        undo_orders()
        undo_products()
        undo_reviews()
        undo_cartitems()
        undo_orderitems()
        undo_favorites()
    seed_users()
    seed_orders()
    seed_products()
    seed_reviews()
    seed_cartitems()
    seed_orderitems()
    seed_favorites()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_orders()
    undo_products()
    undo_reviews()
    undo_cartitems()
    undo_orderitems()
    undo_favorites()
    # Add other undo functions here
