import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import './FavoriteTile.css';
import { addFavoriteThunk, removeFavoriteThunk } from './../../store/favorite';

const FavoriteTile = ({ favorite }) => {
    console.log('Favorite Tile, favorite threaded data, ------------------------------------------------------------', favorite)
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

    return (
        <div className='product-tile'>
            <div className="image-wrapper">
                {favorite.imgUrl ?
                <img src={favorite.imgUrl} alt={favorite.productName} />
                :
                <div className="image-placeholder"></div>
                }
            </div>
            <div className="product-details">
                <div className='product-name'>{favorite.productName}</div>
                <div className='product-rating'>
                    ★ {favorite.avgRating} ({favorite.reviewCount})
                </div>
                <div className='product-price'>{`$${favorite.price}`}</div>
                <button className='favorite-btn' onClick={handleHeartClick}>
                    {isFavorited ?
                        <FontAwesomeIcon icon={solidHeart} style={{ color: "#c70000" }} />
                        :
                        <FontAwesomeIcon icon={regularHeart} style={{ color: "#000000" }} />
                    }
                </button>
            </div>
        </div>
    );
}

export default FavoriteTile;
