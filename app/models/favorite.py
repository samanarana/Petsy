from .db import db

class Favorite(db.Model):
    __tableName__ = 'favorites'

    id = db.Column(db.Integer(), primary_key=True)
    userId = db.Column(db.Integer(), db.ForeignKey('users.id'), nullable=False)
    productId = db.Column(db.Integer(), db.ForeignKey('products.id'), nullable=False)

    user = db.relationship('User', backref=db.backref('favorites'))
    product = db.relationship('Product', backref=db.backref('favorites'))

    def to_dict(self):
        return {
            "id": self.id,
            "userId": self.userId,
            "productId": self.productId,
        }
