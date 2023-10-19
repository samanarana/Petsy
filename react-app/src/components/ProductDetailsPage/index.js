import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { productDetailsThunk } from '../../store/product';
import { addFavoriteThunk, removeFavoriteThunk } from './../../store/favorite';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';

import { useParams } from "react-router-dom";
import './ProductDetails.css';

function ProductDetailsPage() {
    const { productId } = useParams();
    const dispatch = useDispatch();
    const product = useSelector(state => state.product.productDetails);

    const favorites = useSelector(state => state.favorite.favorites);
    const userId = useSelector(state => state.session.user_id);
    const isFavorited = favorites.some((favorite) => favorite.productId === product.id);

    useEffect(() => {
        dispatch(productDetailsThunk(productId));
    }, [dispatch, productId]);

    if (!product) return null;

    const handleHeartClick = (event) => {
        event.stopPropagation();
        event.preventDefault();

        if (isFavorited) {
            const favoriteToRemove = favorites.find((favorite) => favorite.productId === product.id);
            if (favoriteToRemove) {
                dispatch(removeFavoriteThunk(favoriteToRemove.id));
            }
        } else {
            dispatch(addFavoriteThunk(userId, product.id));
        }
    };

    return (
      <div className="product-detail-container">
          <div className="product-images-container">
              <div className="thumbnail-images">
                  <div className="thumbnail"></div>
                  <div className="thumbnail"></div>
                  <div className="thumbnail"></div>
                  <div className="thumbnail"></div>
                  <div className="thumbnail"></div>
                  <div className="thumbnail"></div>

              </div>
              <div className="main-image"></div>
          </div>
          <div className="product-info">
              <h2>${product.price}</h2>
              <p>{product.description}</p>
              <button className="add-to-cart-button">Add to cart</button>

              <button className="favorite-button" onClick={handleHeartClick}>
                    {isFavorited ?
                        <FontAwesomeIcon icon={solidHeart} style={{color: "#c70000"}} />
                        :
                        <FontAwesomeIcon icon={regularHeart} style={{color: "#000000"}} />
                    }
                    <span> Add to favorites</span>
                </button>
          </div>
      </div>
  );
}

export default ProductDetailsPage;
