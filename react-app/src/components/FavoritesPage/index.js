import { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import FavoriteTile from './FavoriteTile';
import { fetchAllFavoritesThunk } from '../../store/favorite';
import { fetchAllProductsThunk } from '../../store/product';

const FavoriteTileList = () => {
    const dispatch = useDispatch();
    const { userId } = useParams()

    useEffect(() => {
        dispatch(fetchAllProductsThunk())
        dispatch(fetchAllFavoritesThunk(userId))
    }, [dispatch, userId]);

    // Get favorite data from redux state
    const favorites = useSelector(state => state.favorite.favorites) || [];
    // console.log('----------------------------------------------', favorites)
    const products = useSelector(state => state.product.products) || [];
    const favoriteProductIds = favorites.map(favorite => favorite.productId);

    const favoriteProducts = products.filter(product => favoriteProductIds.includes(product.id));




    return (
        <div className='product-tile-list'>
            {favoriteProducts.map(favorite => (
                <FavoriteTile key={favorite.id} favorite={favorite} />
            ))}
        </div>
    );
}

export default FavoriteTileList;
