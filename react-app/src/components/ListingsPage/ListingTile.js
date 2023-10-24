import React from 'react';
import './ListingTile.css';

const ListingTile = ({ product }) => {
    return (
        <div className="listing-tile-container">
            <div className="listing-tile">

                <div className="listing-images">
                    {product.imageUrls && product.imageUrls.length > 0 ? (
                        <img src={product.imageUrls[0]} alt={product.productName} className="listing-image"/>
                    ) : (
                        <p>No image available.</p>
                    )}
                </div>

                <p className="listing-title">{product.productName}</p>
                {/* <p className="listing-description">{product.description}</p>*/}
                <p className="listing-price">${product.price.toFixed(2)}</p>
                <p className="listing-category">Category: {product.category}</p>
                <p className="listing-quantity">Quantity: {product.quantity}</p>
            </div>
        </div>
    );
}

export default ListingTile;
