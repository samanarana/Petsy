import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import './ListingsPage.css';
import ListingTile from './ListingTile';
import { fetchAllProductsThunk } from '../../store/product';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faHome } from '@fortawesome/free-solid-svg-icons';

const ListingsPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const products = useSelector((state) => state.product.allProducts);

    useEffect(() => {
        dispatch(fetchAllProductsThunk());
    }, [dispatch]);

    const handleAddListingClick = () => {
        history.push("/add-listing");
    }

    return (
        <div className="page-container">
            <div className="navigation-buttons">
                    <Link to="/" className="home-button"> {/* takes the user to the home page */}
                        <FontAwesomeIcon icon={faHome} style={{ color: '#000', fontSize: '30px', marginRight: '10px' }} />
                    </Link>
                    <button className="add-listing-button" onClick={handleAddListingClick}>
                        <FontAwesomeIcon icon={faPlus} style={{ color: '#ffffff', fontSize: '20px', marginRight: '10px' }} />  Add a Listing
                    </button>
            </div>

            <div className="user-listings">
                {/* Map over the products and display them as tiles */}
                <div className="product-tiles-container">
                    {products.map(product => (
                        <ListingTile  className="product-tile" key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ListingsPage;
