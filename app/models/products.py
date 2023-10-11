from .db import db

class Products(db.Model):
    __tableName__ = 'products'

    id = db.Columm(db.Integer(), primary_key=True)
    userId = db.Column(db.Integer(), db.ForeignKey('users.id'), nullable=False)
    productName = db.Column(db.String(), nullable=False)
    description = db.Column(db.String(), nullable=False)
    price = db.Column(db.Integer(), nullable=False)
    imgUrl = db.Column(db.String(), nullable=False)

    user = db.relationship('User', backref=db.backref('products'))

    def to_dict(self):
        return {
            "id": self.id,
            "userId": self.userId,
            "productName": self.productName,
            "description": self.description,
            "price": self.price,
            "imgUrl": self.imgUrl
        }