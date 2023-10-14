from .db import db

class Product(db.Model):
    __tablename__ = 'products'

    id = db.Column(db.Integer(), primary_key=True)
    userId = db.Column(db.Integer(), db.ForeignKey('users.id'), nullable=False)
    productName = db.Column(db.String(), nullable=False)
    description = db.Column(db.String(), nullable=False)
    price = db.Column(db.Integer(), nullable=False)
    imgUrl = db.Column(db.String(), nullable=False)

    user = db.relationship('User', backref=db.backref('product'))
    cartitems = db.relationship('CartItem', back_populates='product')
    orderitems = db.relationship('OrderItem', back_populates='product')


    def to_dict(self):
        return {
            "id": self.id,
            "userId": self.userId,
            "productName": self.productName,
            "description": self.description,
            "price": self.price,
            "imgUrl": self.imgUrl
        }
