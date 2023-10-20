import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';
import './ProductTile.css';
import { addFavoriteThunk, removeFavoriteThunk } from './../../store/favorite';

const ProductTile = ({ product }) => {
    const dispatch = useDispatch();
    const favorites = useSelector(state => state.favorite.favorites);


    const userId = useSelector(state => state.session.user.id);
    const isFavorited = favorites.find((favorite) => favorite.productId === +product.id);
    console.log("favorited from productTile", isFavorited)

    const handleHeartClick = (event) => {
        event.stopPropagation();
        event.preventDefault();

        if (isFavorited) {

            const favoriteToRemove = favorites.find((favorite) => favorite.productId === +product.id);
            if (favoriteToRemove) {
                dispatch(removeFavoriteThunk(userId, favoriteToRemove.productId));
                console.log('removeFavorite', favoriteToRemove.productId)
            }
        } else {
            dispatch(addFavoriteThunk(userId, product.id));
            console.log('addFavorite', product.id)
        }
    };


    return (
        <Link to={`/products/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className='product-tile'>
                <div className="image-wrapper">
                    {product.imgUrl ?
                        <img src={product.imgUrl} alt={product.productName} />
                        :
                        <div className="image-placeholder"></div>
                    }
                    <button className='favorite-btn' onClick={handleHeartClick}>
                        {isFavorited ?
                            <FontAwesomeIcon icon={solidHeart} style={{color: "#c70000"}} />
                            :
                            <FontAwesomeIcon icon={regularHeart} style={{color: "#000000"}} />
                        }
                    </button>
                </div>
                <div className="product-details">
                    <div className='product-name'>{product.productName}</div>
                    <div className='product-rating'>
                        ★ {product.avgRating} ({product.reviewCount})
                    </div>
                    <div className='product-price'>{`$${product.price}`}</div>
                    <button className='add-to-cart-btn'>+ Add to cart</button>
                </div>
            </div>
        </Link>
    );
}

export default ProductTile;
