import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import './ProductTile.css';

const ProductTile = ({ product }) => {
    const [isFavorited, setIsFavorited] = useState(false);

    const handleHeartClick = () => {
        setIsFavorited(!isFavorited);
    }

    return (
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
    );
}

export default ProductTile;
