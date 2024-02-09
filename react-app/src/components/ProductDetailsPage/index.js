import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams} from "react-router-dom";

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
import LoginFormModal from '../LoginFormModal';

import Spinner from '../Spinner';

function ProductDetailsPage() {

    const [ isLoaded, setIsLoaded ] = useState(false);
    const [ quantity, setQuantity ] = useState(1);
    const [ currentImageIndex, setCurrentImageIndex ] = useState(0);
    const [ cartMessage, setCartMessage ] = useState("");
    const { openModal } = useModal()
    const { productId } = useParams();
    const dispatch = useDispatch();

    const product = useSelector(state => state.product.productDetails);
    const favorites = useSelector(state => state.favorite.favorites);
    const userId = useSelector(state => {
        if (state.session.user && (state.session.user.id === null || state.session.user.id === undefined)) {
          return state.session.user_id;
        } else {
          return state.session.user && state.session.user.id;
        }
      });
    const reviews = useSelector(state => state.review.reviews)



    useEffect(() => {
        dispatch(productDetailsThunk(productId)).then(() => {
            setIsLoaded(true);
        });
        dispatch(getReviewThunk(productId))
    }, [dispatch, productId]);

    const isFavorited = favorites.some((favorite) => favorite.productId === product.id);

    if (isLoaded === false) {
        return <Spinner />
    };

    if (!product) return null;

    const handleHeartClick = (event) => {
        event.stopPropagation();
        event.preventDefault();

        if (!userId) {
            openModal(<LoginFormModal />);
            return;
        };

        if (isFavorited) {
            const favoriteToRemove = favorites.find((favorite) => favorite.productId === product.id);
            if (favoriteToRemove) {
                dispatch(removeFavoriteThunk(favoriteToRemove.userId, favoriteToRemove.productId));
            }
        } else {
            dispatch(addFavoriteThunk(userId, product.id));
        }
    };

    const handleAddToCart = () => {

        if (!userId) {
            openModal(<LoginFormModal />);
            return;
        };

        if (quantity > product.quantity) {
            setCartMessage("Out of stock :(");
            return;
        }

        dispatch(addToCartThunk({
            productId: product.id,
            quantity: quantity,
            price: product.price
        })).then(() => {
            setCartMessage(`${quantity > 1 ? "Items" : "Item"} added successfully!`);
        });
    };

    const handleDeleteReview = (reviewId) => {
        const deteleIt = window.confirm("Are you sure you want to delete this review?");
        if (deteleIt) {
            dispatch(deleteReviewThunk(reviewId)).then(() => {
                dispatch(getReviewThunk(productId));
            });
        }
    };

    const handleUpdateReview = (review) => {
        openModal(<UpdateReviewModal productId={productId} reviewId={review.id} />);
    };

    const handleThumbnailClick = (index) => {
        setCurrentImageIndex(index);
    };



    return (
        <>
        <div className="product-detail-container">

            <div className="product-images-container">
                <div className="thumbnail-images">
                    {product.imageUrls.filter(url => url.trim() !== '').map((imageUrl, idx) => (
                        <div className="thumbnail" key={idx} onClick={() => handleThumbnailClick(idx)}>
                            <img src={imageUrl} alt="" />
                        </div>
                    ))}
                </div>

                <div className="main-image">
                    {product.imageUrls && product.imageUrls[currentImageIndex] ? (
                        <img className="main-image-url" src={product.imageUrls[currentImageIndex]} alt={product.productName} />
                    ) : (
                        <div className="main-image-placeholder">No Images Available</div>
                    )}
                </div>

            </div>

            <div className="product-info">
                    <p className="detail-product-price">${product.price}</p>
                    <p className="product-name-detail">{product.productName}</p>
                    <p className="product-description">{product.description}</p>

                    <label>Quantity</label>
                <div className="dropdown-container-details">
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
                        {cartMessage && (
                            cartMessage === "Insufficient stock available." ?
                                <div className="error-message">{cartMessage}</div> :
                                <div className="success-message">{cartMessage}</div>
                        )}

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
