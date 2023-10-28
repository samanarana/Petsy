import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import './ListingsPage.css';
import ListingTile from './ListingTile';
import { fetchAllProductsThunk, deleteProductThunk } from '../../store/product';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faHome, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const ListingsPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const products = useSelector((state) => state.product.allProducts);

    const [selectedTile, setSelectedTile] = useState(null);

    useEffect(() => {
        dispatch(fetchAllProductsThunk());
    }, [dispatch]);

    const handleAddListingClick = () => {
        history.push("/add-listing");
    }

    const handleUpdateClick = () => {
        if (selectedTile) {
            // Navigate to the update page with selectedTile's details
            history.push(`/update/${selectedTile.id}`);
        }
    }

    const handleDeleteClick = async () => {
        if (selectedTile) {
            await dispatch(deleteProductThunk(selectedTile.id));
            setSelectedTile(null);  // Reset selected tile after deletion
        }
    }

    return (
        <div className="page-container">
            <div className="navigation-buttons">
                <div className="edit-and-delete">
                    <button className="update-listing-button" onClick={handleUpdateClick} disabled={!selectedTile}>
                    <FontAwesomeIcon icon={faEdit} style={{ color: selectedTile ? '#6c6d6f' : 'gray', fontSize: '20px', marginRight: '10px' }} /> Update
                    </button>

                    <button className="delete-listing-button" onClick={handleDeleteClick} disabled={!selectedTile}>
                    <FontAwesomeIcon icon={faTrash} style={{ color: selectedTile ? '#6c6d6f' : 'gray', fontSize: '20px', marginRight: '10px' }} /> Delete
                    </button>
                </div>

                    <button className="add-listing-button" onClick={handleAddListingClick}>
                        <FontAwesomeIcon icon={faPlus} style={{ color: '#ffffff', fontSize: '20px', marginRight: '10px' }} />  Add a Listing
                    </button>

            </div>

            <div className="user-listings">
                <div className="product-tiles-container">
                    {products.map(product => (
                        <ListingTile
                            className="product-tile"
                            key={product.id}
                            product={product}
                            onTileSelected={setSelectedTile}
                            isSelected={selectedTile && selectedTile.id === product.id}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ListingsPage;
