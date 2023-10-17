import { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import FavoriteTile from './FavoriteTile';
import { fetchAllFavoritesThunk } from '../../store/favorite';

const FavoriteTileList = () => {
    const dispatch = useDispatch();
    const { userId } = useParams()

    useEffect(() => {
        dispatch(fetchAllFavoritesThunk(userId))
    }, [dispatch, userId]);

    // Get favorite data from redux state
    const favorites = useSelector(state => state.favorite.favorites) || [];

    return (
        <div className='favorite-tile-list'>
            {favorites.map(favorite => (
                <FavoriteTile key={favorite.id} favorite={favorite} />
            ))}
        </div>
    );
}

export default FavoriteTileList;
