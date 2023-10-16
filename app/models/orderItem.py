from .db import db, environment, SCHEMA, add_prefix_for_prod

class OrderItem(db.Model):
    __tablename__ = 'orderitems'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    orderId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("orders.id")), nullable=False)
    productId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("products.id")),nullable=False)

    order = db.relationship("Order", back_populates="items")
    product = db.relationship("Product", back_populates="orderitems")

    def to_dict(self):
        return {
            "id": self.id,
            "orderId": self.orderId,
            "productId": self.productId
        }
