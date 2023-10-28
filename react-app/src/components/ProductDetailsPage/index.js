import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory} from "react-router-dom";


import { productDetailsThunk } from '../../store/product';
import { addFavoriteThunk, removeFavoriteThunk } from './../../store/favorite';
import { addToCartThunk } from '../../store/cartitems';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart, faStar as fasStar, faStar as farStar } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

import { getReviewThunk } from '../../store/review';
import { deleteReviewThunk } from '../../store/review';
import UpdateReviewModal from '../UpdateReviewModal/UpdateReviewModal';

import './ProductDetails.css';
import { useModal } from '../../context/Modal';

function ProductDetailsPage() {

    const [ isLoaded, setIsLoaded ] = useState(false);
    const [ quantity, setQuantity ] = useState(1);

    const { openModal } = useModal()
    const [error, setError] = useState(null);


    const { productId } = useParams();
    const dispatch = useDispatch();

    const cartItems = useSelector(state => state.cartitems.currentCart);
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
    const reviews = useSelector(state => state.review.reviews)



    useEffect(() => {
        dispatch(productDetailsThunk(productId)).then(() => {
            setIsLoaded(true);
        });
        dispatch(getReviewThunk(productId))
    }, [dispatch, productId]);

    const isFavorited = favorites.some((favorite) => favorite.productId === product.id);

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
        const existingItem = cartItems.find(item => item.productId === product.id);

        const currentTotalQuantity = existingItem ? existingItem.quantity + quantity : quantity;

        if (currentTotalQuantity > 10) {
            setError("You can't add more than 10 of this product to your cart.");
            return;
        } else {
            setError(null);
        }

        dispatch(addToCartThunk({
            productId: product.id,
            quantity: quantity,
            price: product.price
        }));
    };


    const handleDeleteReview = (reviewId) => {
        dispatch(deleteReviewThunk(reviewId)).then(() => {
            dispatch(getReviewThunk(productId));
        });
    };

    const handleUpdateReview = (review) => {
        openModal(<UpdateReviewModal productId={productId} reviewId={review.id} />);
    };




    return (
        <>
        <div className="product-detail-container">

            <div className="product-images-container">
                <div className="thumbnail-images">
                    {Array(6).fill(null).map((_, idx) => (
                        <div className="thumbnail" key={idx}>
                            {product.imageUrls && product.imageUrls.length > idx ? (
                                <img src={product.imageUrls[idx]} alt={`${product.productName} Thumbnail ${idx + 1}`} />
                            ) : (
                                <div className="thumbnail-placeholder"></div>
                            )}
                        </div>
                    ))}
                </div>
                <div className="main-image">
                    {product.imageUrls && product.imageUrls.length > 0 ?
                        <img className="main-image-url" src={product.imageUrls[0]} alt={product.productName} />
                        :
                        // Placeholder for the main image when there are no images
                        <div className="main-image-placeholder">No Image Available</div>
                    }
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
                            <option disabled defaultValue={1}>Select an option</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    <FontAwesomeIcon icon={faChevronDown} className="dropdown-icon" />
                </div>

                    <button className="add-to-cart-button" onClick={handleAddToCart}>Add to cart</button>
                    {error && <div className="error-message">{error}</div>}

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

        </div>

        <div className="reviews-section">
        <div className="reviews-header">
            {reviews && reviews.length > 0 ? (
                <p className="reviews-title">
                {reviews.length} {reviews.length === 1 ? "Review" : "Reviews"}
                </p>
            ) : (
                <p className="reviews-title">
                    <FontAwesomeIcon className="new-listing-star" icon={farStar} />
                    New Listing
                </p>
            )}
        </div>


            {reviews && reviews.length > 0 ? (
            <ul className="review-list-container">
            {reviews.map((review) => (
                <li className="review-list-itself" key={review.id}>
                <p className="reviews-username">{review.username}</p>
                <p className="reviews-date">{new Date(review.dateCreated).toLocaleDateString()}</p>

                <div className="reviews-rating">
                    {Array(5).fill(null).map((_, idx) => (
                        <FontAwesomeIcon
                            className="review-star"
                            key={idx}
                            icon={idx < review.rating ? fasStar : farStar}
                            style={idx < review.rating ? {color: "#FFD700"} : {}}
                        />
                    ))}
                </div>

                <p className="reviews-description">{review.description}</p>
                {userId === review.userId && (
                    <div className="button-container">
                    <button className="delete-reviews-button" onClick={() => handleDeleteReview(review.id)}>Delete Review</button>
                    <button className="update-reviews-button" onClick={() => handleUpdateReview(review)}>Update Review</button>
                    </div>
                )}
                </li>
            ))}
            </ul>
        ) : (
            <p className="no-reviews-yet">No reviews yet.</p>
        )}
        </div>
    </>
  );
}

export default ProductDetailsPage;
