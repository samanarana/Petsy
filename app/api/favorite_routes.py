# from flask import Blueprint, jsonify, request
# from flask_login import login_required, current_user
# from app.models import Favorite
# from app import db


# favorite_routes = Blueprint('favorites', __name__)


# # Retrieve all favorite products of a user
# @favorite_routes.route('/<int:userId>', methods=['GET'])
# @login_required
# def get_favorites(userId):
#     # if userId != current_user.id:
#     #     return jsonify({"message": "Unauthorized"})

#     favorites = Favorite.query.filter_by(userId=userId).all()
#     return {'favorites': [favorite.to_dict() for favorite in favorites]}


# Mark a product as favorite
# import logging

# @favorite_routes.route('/', methods=['POST'])
# @login_required
# def add_favorite():
#     data = request.get_json()

#     # Log the incoming data to see its structure
#     logging.info(f"Incoming data for add_favorite: {data}")

#     # Check if 'productId' is in the data
#     if 'productId' not in data:
#         return jsonify({"message": "productId is required"}), 400

#     new_favorite = Favorite(
#         userId=current_user.id,
#         productId=data['productId']
#     )

#     db.session.add(new_favorite)
#     db.session.commit()

#     return new_favorite.to_dict()



# # Remove a product from favorites
# @favorite_routes.route('/<int:userId>/<int:productId>', methods=['DELETE'])
# @login_required
# def remove_favorite(productId):
#     favorite = Favorite.query.filter_by(userId=current_user.id, productId=productId).first()

#     if not favorite:
#         return jsonify({"message": "Favorite not found"}), 404

#     db.session.delete(favorite)
#     db.session.commit()

#     return {'message': 'Favorite removed'}
