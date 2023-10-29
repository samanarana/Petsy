from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
from sqlalchemy.sql import func

class Review(db.Model):
    __tablename__ = 'reviews'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}


    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey( add_prefix_for_prod('users.id')), nullable=False)
    productId = db.Column(db.Integer, db.ForeignKey( add_prefix_for_prod('products.id')), nullable=False)
    description = db.Column(db.String, nullable=False)
    rating = db.Column(db.Integer)
    dateCreated = db.Column(db.DateTime(timezone=True), nullable=False)

    user = db.relationship('User', backref=db.backref('reviews'))
    product = db.relationship('Product', back_populates='reviews')

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'productId': self.productId,
            'description': self.description,
            'rating': self.rating,
            'dateCreated': self.dateCreated,
            'username': self.user.username
        }
