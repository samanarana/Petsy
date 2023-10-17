import './FavoriteTile.css';

const FavoriteTile = ({ favorite }) => {
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
                <button className='add-to-cart-btn'>+ Add to cart</button>
            </div>
        </div>
    );
}

export default FavoriteTile;
