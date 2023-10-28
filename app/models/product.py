from .db import db, environment, SCHEMA, add_prefix_for_prod

class Product(db.Model):
    __tablename__ = 'products'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer(), primary_key=True)
    userId = db.Column(db.Integer(), db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    productName = db.Column(db.String(), nullable=False)
    description = db.Column(db.String(), nullable=False)
    price = db.Column(db.Integer(), nullable=False)
    category = db.Column(db.String(), nullable=False)
    quantity = db.Column(db.Integer(), nullable=False, default=1)



    user = db.relationship('User', backref=db.backref('product'))
    cartitems = db.relationship('CartItem', back_populates='product')
    orderitems = db.relationship('OrderItem', back_populates='product')
    images = db.relationship('ProductImage', back_populates='product', cascade='all, delete-orphan')


    def to_dict(self):
        return {
            "id": self.id,
            "userId": self.userId,
            "productName": self.productName,
            "description": self.description,
            "price": self.price,
            "category": self.category,
            'quantity': self.quantity,
            'imageUrls': [img.imgUrl for img in self.images]
        }
