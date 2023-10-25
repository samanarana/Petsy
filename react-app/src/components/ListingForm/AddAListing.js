import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import './AddAListing.css';
import { createProductThunk } from './../../store/product';

const AddAListing = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const handleAddProduct = (event) => {
        event.preventDefault();

        // Gathering values from form inputs
        const productData = {
            productName: event.target.productName.value,
            description: event.target.description.value,
            price: parseFloat(event.target.price.value),
            category: event.target.category.value,
            quantity: parseInt(event.target.quantity.value),
        };

        // Collect image files and validate them
        const imageUrls = [];
        const imageFiles = [];

        for (let i = 1; i <= 6; i++) {
            const imageUrl = event.target[`imageUrl${i}`].value;
            const file = event.target[`imageFile${i}`].files[0];

            if (imageUrl) {
                imageUrls.push(imageUrl);
            } else if (file && file.name.endsWith('.jpg')) {
                imageFiles.push(file);
            } else if (file) {
                alert("Only .jpg files are allowed.");
                return;
            }
        }

        dispatch(createProductThunk(productData))
        .then(() => {
            history.push("/listings");
        });
    }

    return (
        <div className="main-container">
            <div className="add-listing-container">
                <form className="add-listing-form" onSubmit={handleAddProduct}>
                    <h2 className="add-listing-title">Add a New Listing</h2>

                    <div className="input-group title-input-group">
                        <label htmlFor="productName" className="input-label">Product Name:</label>
                        <input type="text" id="productName" name="productName" className="text-input" placeholder="Enter product name" required />
                    </div>

                    <div className="input-group description-input-group">
                        <label htmlFor="description" className="input-label">Description:</label>
                        <textarea id="description" name="description" className="text-area-input" rows="4" placeholder="Enter product description" required></textarea>
                    </div>

                    <div className="input-group price-input-group">
                        <label htmlFor="price" className="input-label">Price ($):</label>
                        <input type="number" id="price" name="price" className="number-input" placeholder="0.00" step="0.01" required />
                    </div>

                    <div className="input-group category-input-group">
                        <label htmlFor="category" className="input-label">Category:</label>
                        <input type="text" id="category" name="category" className="text-input" placeholder="Enter product category" required />
                    </div>

                    <div className="input-group quantity-input-group">
                        <label htmlFor="quantity" className="input-label">Quantity:</label>
                        <input type="number" id="quantity" name="quantity" className="number-input" placeholder="Enter quantity" required />
                    </div>

                    <div className="input-group images-input-group">
                        <label className="input-label">Product Images (up to 6):</label>
                        {Array.from({ length: 6 }).map((_, index) => (
                            <div key={index} className="image-option-container">
                                <div className="url-or-file-container">
                                    <input
                                        type="text"
                                        id={`imageUrl${index + 1}`}
                                        name={`imageUrl${index + 1}`}
                                        className="text-input url-input"
                                        placeholder="Paste image URL here"
                                    />
                                    <span className="or-separator">or</span>
                                    <input
                                        type="file"
                                        id={`imageFile${index + 1}`}
                                        name={`imageFile${index + 1}`}
                                        className="file-input"
                                        accept=".jpg"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>



                    <button type="submit" className="submit-listing-button">Add Listing</button>
                </form>
            </div>
        </div>
    );
}

export default AddAListing;
