from .db import db

class OrderItem(db.Model):
    __tablename__ = 'orderItems'

    id = db.Column(db.Integer, primary_key=True)
    orderId = db.Column(db.Integer, db.ForeignKey("orders.id"), nullable=False)
    productId = db.Column(db.Integer, db.ForeignKey("products.id"),nullable=False)

    order = db.relationship("Order", back_populates="orderItems")
    product = db.relationship("Product", back_populates="orderItems")

    def to_dict(self):
        return {
            "id": self.id,
            "orderId": self.orderId,
            "productId": self.productId
        }
