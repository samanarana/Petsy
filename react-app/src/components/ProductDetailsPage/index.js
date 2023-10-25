import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";

import { productDetailsThunk } from '../../store/product';
import { addFavoriteThunk, removeFavoriteThunk } from './../../store/favorite';
import { addToCartThunk } from '../../store/cartitems';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

import { getReviewThunk } from '../../store/review';
import { deleteReviewThunk } from '../../store/review';

import './ProductDetails.css';

function ProductDetailsPage() {

    const [ isLoaded, setIsLoaded ] = useState(false);
    const [quantity, setQuantity] = useState(1);

    const { productId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(productDetailsThunk(productId)).then(() => {
            setIsLoaded(true);
        });
        dispatch(getReviewThunk(productId))
    }, [dispatch, productId]);

    const product = useSelector(state => state.product.productDetails);
    const favorites = useSelector(state => state.favorite.favorites);
    const userId = useSelector(state => {
        if (state.session.user && (state.session.user.id === null || state.session.user.id === undefined)) {
          return state.session.user_id;
        } else {
          return state.session.user && state.session.user.id;
        }
      });
    console.log(userId)
    const isFavorited = favorites.some((favorite) => favorite.productId === product.id);
    const reviews = useSelector(state => state.review.reviews)

    if (!isLoaded) {
        return <div>Loading...</div>;
        //placholder, let's update this to something pretty later
    }

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

    const handleAddToCart = () => {
        console.log("handleAddToCart triggered");

        dispatch(addToCartThunk({
            productId: product.id,
            quantity,
            price: product.price
        })).then(() => {
            history.push('/cart');  // Redirect to cart page
        });
    };

    const handleDeleteReview = (reviewId) => {
        dispatch(deleteReviewThunk(reviewId)).then(() => {
            dispatch(getReviewThunk(productId));
        });
    };

    const handleUpdateReview = (review) => {
        history.push({
          pathname: `/products/${productId}/review/${review.id}`,
          state: { review }
        });
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
              <div className="main-image">
                  <img className="main-image-url" src={product.imgUrl} alt={product.productName} />
              </div>
          </div>
          <div className="product-info">
                <p className="detail-product-price">${product.price}</p>

                <label>Quantity</label>
            <div className="dropdown-container">
                    <select
                        className="quantity-dropdown"
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}>
                        <option disabled selected>Select an option</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>
                <FontAwesomeIcon icon={faChevronDown} className="dropdown-icon" />
            </div>

                <button className="add-to-cart-button" onClick={handleAddToCart}>Add to cart</button>

                <button className="favorite-button" onClick={handleHeartClick}>
                        {isFavorited ?
                            <FontAwesomeIcon icon={solidHeart} style={{color: "#c70000"}} />
                            :
                            <FontAwesomeIcon icon={regularHeart} style={{color: "#000000"}} />
                        }
                        <span> Add to favorites</span>
                    </button>

                <p>{product.description}</p>

          </div>
          <div className="reviews-section">
      <h2>Reviews</h2>
      {reviews && reviews.length > 0 ? (
        <ul>
          {reviews.map((review) => (
            <li key={review.id}>
              <p>{review.username}</p>
              <p>{review.description}</p>
              <p>Rating: {review.rating}</p>
              {userId === review.userId && (
                <>
                <button onClick={() => handleDeleteReview(review.id)}>Delete Review</button>
                <button onClick={() => handleUpdateReview(review)}>Update Review</button>
                </>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No reviews yet.</p>
      )}
    </div>

      </div>

  );
}

export default ProductDetailsPage;
