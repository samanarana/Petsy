from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Order(db.Model):
    __tablename__ = 'orders'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    orderDate = db.Column(db.DateTime, default=datetime.now(), nullable=False)
    totalPrice = db.Column(db.Float, default=0)
    shippingAddress = db.Column(db.String, nullable=False)
    billingAddress = db.Column(db.String, nullable=False)
    paymentMethod = db.Column(db.String, nullable=False)
    orderStatus = db.Column(db.String, default="pending")


    user = db.relationship("User", back_populates="orders")
    # items = db.relationship("OrderItem", back_populates="order")

    def to_dict(self):
        return {
            "id": self.id,
            "userId": self.userId,
            "orderDate": self.orderDate,
            "totalPrice": self.totalPrice,
            "shippingAddress": self.shippingAddress,
            "billingAddress": self.billingAddress,
            "paymentMethod": self.paymentMethod,
            "orderStatus": self.orderStatus
        }
