from .db import db, environment, SCHEMA, add_prefix_for_prod

class Favorite(db.Model):
    __tablename__ = 'favorites'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer(), primary_key=True)
    userId = db.Column(db.Integer(), db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    productId = db.Column(db.Integer(), db.ForeignKey(add_prefix_for_prod('products.id')), nullable=False)

    user = db.relationship('User', backref=db.backref('favorites'))
    product = db.relationship('Product', backref=db.backref('favorites'))

    def to_dict(self):
        return {
            "id": self.id,
            "userId": self.userId,
            "productId": self.productId,
        }
