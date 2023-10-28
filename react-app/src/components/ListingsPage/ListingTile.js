import React from 'react';
import './ListingTile.css';

const ListingTile = ({ product, onTileSelected, isSelected }) => {

    const handleSelectClick = (event) => {
        event.stopPropagation();
        if (isSelected) {
            onTileSelected(null);
        } else {
            onTileSelected(product);
        }
    };

    return (
        <div className="listing-tile-container">
            <div className={`listing-tile ${isSelected ? 'selected-tile' : ''}`}>

                <div className="listing-images">
                    {product.imageUrls && product.imageUrls.length > 0 ? (
                        <img src={product.imageUrls[0]} alt={product.productName} className="listing-image"/>
                    ) : (
                        <p>No image available.</p>
                    )}
                </div>

                <p className="listing-title">{product.productName}</p>
                <p className="listing-price">${product.price.toFixed(2)}</p>
                <p className="listing-category">Category: {product.category}</p>
                <p className="listing-quantity">Quantity: {product.quantity}</p>

                <div className="tile-selected-indicator" onClick={handleSelectClick}>
                    {isSelected ? '✓' : ''}
                </div>
            </div>
        </div>
    );
}

export default ListingTile;
