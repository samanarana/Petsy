from .db import db

class cartitems(db.Model):
    __tablename__ = 'cartitems'

    id = db.Column(db.Integer, primary_key=True)
    cartId = db.Column(db.Integer, db.ForeignKey("carts.id"), nullable=False)
    productId = db.Column(db.Integer, db.ForeignKey("products.id"), nullable=False)
    quantity = db.Column(db.Integer, default=1)
    price = db.Column(db.Float, nullable=False)


    cart = db.relationship("Cart", back_populates="cartitems")
    product = db.relationship("Product", back_populates="cartitems")

    def to_dict(self):
        return {
            "id": self.id,
            "cartId": self.cartId,
            "productId": self.productId,
            "quantity": self.quantity,
            "price": self.price
        }
