from .db import db

class OrderItem(db.Model):
    __tablename__ = 'orderitems'

    id = db.Column(db.Integer, primary_key=True)
    orderId = db.Column(db.Integer, db.ForeignKey("orders.id"), nullable=False)
    productId = db.Column(db.Integer, db.ForeignKey("products.id"),nullable=False)

    order = db.relationship("Order", back_populates="items")  
    product = db.relationship("Product", back_populates="orderitems")

    def to_dict(self):
        return {
            "id": self.id,
            "orderId": self.orderId,
            "productId": self.productId
        }
