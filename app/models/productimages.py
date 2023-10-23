from .db import db, environment, SCHEMA, add_prefix_for_prod

class ProductImage(db.Model):
    __tablename__ = 'productimages'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    productId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("products.id")),nullable=False)
    imgUrl = db.Column(db.String(), nullable=False)


    product = db.relationship("Product", back_populates="images")

    def to_dict(self):
        return {
            "id": self.id,
            "productId": self.productId,
            "imgUrl": self.imgUrl
        }
