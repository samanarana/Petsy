import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import './FavoriteTile.css';
import { addFavoriteThunk, removeFavoriteThunk } from './../../store/favorite';
import { getReviewThunk } from './../../store/review';

const FavoriteTile = ({ favorite }) => {
    const dispatch = useDispatch();
    const favorites = useSelector(state => state.favorite.favorites);
    const userId = useSelector(state => state.session.user.id)
    const isFavorited = favorites.some((fav) => fav.productId === +favorite.id);

    const handleHeartClick = (event) => {
        event.stopPropagation();
        event.preventDefault();

        if (isFavorited) {
            dispatch(removeFavoriteThunk(userId, favorite.id));
        } else {
            dispatch(addFavoriteThunk(userId, favorite.id));
        }
    };

    const [reviews, setReviews] = useState([]); // Store fetched reviews
    const [avgRating, setAvgRating] = useState(0); // Store calculated average rating

    useEffect(() => {
        const fetchReviews = async () => {
            const response = await dispatch(getReviewThunk(favorite.id));
            if (response && response.length) {
                setReviews(response);
                // Calculate average rating
                const totalRating = response.reduce((acc, review) => acc + review.rating, 0);
                setAvgRating((totalRating / response.length).toFixed(1));
            }
        };

        fetchReviews();
    }, [dispatch, favorite.id]);


    return (
        <div className='product-tile'>
            <div className="image-wrapper">
                <Link to={`/products/${favorite.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    {favorite.imageUrls ?
                        <img className="real-images" src={favorite.imageUrls[0]} alt={favorite.productName} />
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
                <div className='product-name'>{favorite.productName}</div>
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
                <div className='product-price'>{`$${favorite.price}`}</div>
            </div>
        </div>
    );
}

export default FavoriteTile;
