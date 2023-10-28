import React, { useState, useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';
import './ProductTile.css';
import { addToCartThunk } from '../../store/cartitems';
import { addFavoriteThunk, removeFavoriteThunk } from './../../store/favorite';
import { getReviewThunk } from './../../store/review';
import { useModal } from '../../context/Modal';
import LoginFormModal from "../LoginFormModal";

const ProductTile = ({ product: { id, imageUrls, productName, reviewCount, price } }) => {
    const dispatch = useDispatch();

    const [reviews, setReviews] = useState([]); // Store fetched reviews
    const [avgRating, setAvgRating] = useState(0); // Store calculated average rating

    useEffect(() => {
        const fetchReviews = async () => {
            const response = await dispatch(getReviewThunk(id));
            console.log('Fetched reviews for product', id, response);
            if (response && response.length) {
                setReviews(response);
                // Calculate average rating
                const totalRating = response.reduce((acc, review) => acc + review.rating, 0);
                setAvgRating((totalRating / response.length).toFixed(1));
            }
        };

        fetchReviews();
    }, [dispatch, id]);

    const { openModal } = useModal();
    const userId = useSelector(state => state.session.user && state.session.user.id);
    const favorites = useSelector(state => state.favorite.favorites);

    const isProductFavorited = useMemo(() => {
        return favorites.some(favorite => favorite.productId === id);
    }, [favorites, id]);

    const [isFavorited, setIsFavorited] = useState(isProductFavorited);

    const handleAddToCart = () => {

        dispatch(addToCartThunk({
            productId: id,
            quantity: 1,
            price: price
        }))
    };

    const handleHeartClick = (event) => {
        event.stopPropagation();
        event.preventDefault();

        if (!userId) {
            openModal(<LoginFormModal />);
            return;
        }

        if (isFavorited) {
            dispatch(removeFavoriteThunk(userId, id));
        } else {
            dispatch(addFavoriteThunk(userId, id));
        }

        setIsFavorited(!isFavorited);
    };

    return (
            <div className='product-tile'>
                <div className="image-wrapper">
                    <Link to={`/products/${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        {imageUrls ?
                            <img className="real-images" src={imageUrls[0]} alt={productName} />
                            :
                            <div className="image-placeholder"></div>
                        }
                    </Link>
                    <button className='favorite-btn' onClick={handleHeartClick}>
                        {isFavorited ?
                            <FontAwesomeIcon icon={solidHeart} style={{color: "#c70000"}} />
                            :
                            <FontAwesomeIcon icon={regularHeart} style={{color: "#000000"}} />
                        }
                    </button>
                </div>
                <div className="product-details">
                    <div className='product-name'>{productName}</div>
                    <div className='product-rating'>
                        {reviews.length > 0
                            ? (
                                <>
                                    {avgRating}★ · ({reviews.length})
                                </>
                            )
                            : (
                                <>
                                    NEW★
                                </>
                              )}
                    </div>
                    <div className='product-price'>{`$${price}`}</div>
                    <button className='add-to-cart-btn' onClick={handleAddToCart}>+ Add to cart</button>
                </div>
            </div>
    );
}

export default ProductTile;
