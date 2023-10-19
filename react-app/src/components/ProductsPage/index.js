import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductTile from './ProductTile';
import { fetchAllProductsThunk } from '../../store/product';


const ProductTileList = () => {
    const dispatch = useDispatch();
    const userId = useSelector(state => state.session.user_id);

    useEffect(() => {
        dispatch(fetchAllProductsThunk())
    }, [dispatch]);

    // Get product data from redux state
    const products = useSelector(state => state.product.products) || [];

    return (
        <div className='product-tile-list'>
            <>
                {products.map(product => (
                    <ProductTile key={product.id} product={product} userId={userId}/>
                ))}
            </>
        </div>
    );

}

export default ProductTileList;
