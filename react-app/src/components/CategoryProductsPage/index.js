import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { convertToBackendCategory, fetchProductsByCategoryThunk } from '../../store/product';
import ProductTile from '../ProductsPage/ProductTile';

function CategoryProductsPage() {
    const dispatch = useDispatch();
    const { category } = useParams();
    const productsByCategory = useSelector(state => state.product.list);

    useEffect(() => {
        const backendCategory = convertToBackendCategory(category);
        dispatch(fetchProductsByCategoryThunk(backendCategory));
    }, [category, dispatch]);

    return (
        <div>
            {productsByCategory.length === 0 ? (
                <p className="cart-is-empty" style={{ fontSize: '25px' }}>No {category} products yet</p>
            ) : (
                <div className="product-tile-list">
                    {productsByCategory.map(product => (
                        <ProductTile key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default CategoryProductsPage;
