import React, { useState, useMemo } from 'react';
import { useHistory, Link } from 'react-router-dom';
import './HolidayTile.css';
import { useDispatch, useSelector } from 'react-redux';
import { addFavoriteThunk, removeFavoriteThunk } from './../../store/favorite';
import { productDetailsThunk } from './../../store/product';
import LoginFormModal from "../LoginFormModal";
import { useModal } from '../../context/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';

function HolidayTile({ product, id, isLarge }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const { openModal } = useModal();
    const userId = useSelector(state => state.session.user && state.session.user.id);
    const favorites = useSelector(state => state.favorite.favorites);

    const isProductFavorited = useMemo(() => {
        return favorites.some(favorite => favorite.productId === product.id);
    }, [favorites, product.id]);

    const [isFavorited, setIsFavorited] = useState(isProductFavorited);

    const handleHeartClick = (event) => {
        event.stopPropagation();
        event.preventDefault();

        if (!userId) {
            openModal(<LoginFormModal />);
            return;
        }

        if (isFavorited) {
            dispatch(removeFavoriteThunk(userId, product.id));
        } else {
            dispatch(addFavoriteThunk(userId, product.id));
        }

        setIsFavorited(!isFavorited);
    };

    const handleTileClick = async () => {
        await dispatch(productDetailsThunk(id));
        history.push(`/products/${product.id}`);
    };


    return (
        <Link to={`/products/${product.id}`}>
            <div className={`${isLarge ? 'large-holiday-tile' : 'holiday-tile'}`} onClick={handleTileClick}>

                {product.imageUrls && product.imageUrls.length ?
                    <img src={product.imageUrls[0]} alt={product.name} className="holiday-tile-image" />
                    :
                    <div className="image-placeholder"></div>
                }

                <div className="holiday-tile-overlay">
                    <p className="holiday-tile-price">${product.price}</p>
                    <button className='favorite-btn' onClick={handleHeartClick}>
                        {isFavorited ?
                            <FontAwesomeIcon icon={solidHeart} style={{ color: "#c70000" }} />
                            :
                            <FontAwesomeIcon icon={regularHeart} style={{ color: "#000000" }} />
                        }
                    </button>
                </div>
            </div>
        </Link>
    );
}

export default HolidayTile;
