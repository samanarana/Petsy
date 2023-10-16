import './ProductTile.css';

const ProductTile = ({ product }) => {
    return (
        <div className='product-tile'>
            <div className="image-wrapper">
                {product.imgUrl ?
                <img src={product.imgUrl} alt={product.productName} />
                :
                <div className="image-placeholder"></div>
                }
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
