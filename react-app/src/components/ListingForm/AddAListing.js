import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import './AddAListing.css';
import { createProductThunk } from './../../store/product';

const AddAListing = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [errors, setErrors] = useState([]);

    const getErrorMessage = (fieldName) => {
        const error = errors.find(err => err.field === fieldName);
        return error ? error.message : null;
    };

    const handleAddProduct = (event) => {
        event.preventDefault();
                const newErrors = [];

        // Validation checks
        if (!event.target.productName.value || event.target.productName.value.length < 4) {
            newErrors.push({ field: 'productName', message: 'Product name must be at least 4 characters.' });
        }

        if (!event.target.description.value || event.target.description.value.length < 30) {
            newErrors.push({ field: 'description', message: 'Description must be at least 30 characters.' });
        }

        const price = parseFloat(event.target.price.value);
        if (isNaN(price) || price <= 0.00 || (Math.floor(price) !== price && (price * 100) % 1 !== 0)) {
            newErrors.push({ field: 'price', message: 'Price must be greater than 0.00 and have a maximum of 2 decimal places.' });
        }

        if (!event.target.category.value) {
            newErrors.push({ field: 'category', message: 'A category must be selected.' });
        }

        const quantity = parseInt(event.target.quantity.value);
        if (isNaN(quantity) || quantity < 1) {
            newErrors.push({ field: 'quantity', message: 'Quantity must be a minimum of 1.' });
        }

        // Collect image files and validate them
        for (let i = 1; i <= 6; i++) {
            const imageUrl = event.target[`imageUrl${i}`].value;
            const file = event.target[`imageFile${i}`].files[0];

            // If neither a URL nor file is provided, skip to the next iteration
            if (!imageUrl && !file) continue;

            // Check for valid URL if provided
            if (imageUrl) {
                try {
                    new URL(imageUrl);
                } catch (_) {
                    newErrors.push({ field: `image${i}`, message: 'Invalid URL provided.' });
                    continue;  // Move to the next iteration  no need to check for file validity
                }
            }

            // If a file is provided and it doesn't end with .jpg, push an error
            if (file && !file.name.endsWith('.jpg')) {
                newErrors.push({ field: `image${i}`, message: 'Only .jpg files are allowed.' });
            }
        }



        if (newErrors.length > 0) {
            setErrors(newErrors);
            return;
        }

        // Gathering values from form inputs
        const productData = {
            productName: event.target.productName.value,
            description: event.target.description.value,
            price: parseFloat(event.target.price.value),
            category: event.target.category.value,
            quantity: parseInt(event.target.quantity.value),
        };

        dispatch(createProductThunk(productData))
        .then(() => {
            history.push("/listings");
        });
    }

    return (
        <div className="main-container-add-listing">
            <div className="add-listing-container">
                <form className="add-listing-form" onSubmit={handleAddProduct}>
                    <h2 className="add-listing-title">Add a New Listing</h2>

                    <div className="input-group title-input-group">
                        <label htmlFor="productName" className="input-label">Product Name:</label>
                        <input type="text" id="productName" name="productName" className="text-input" placeholder="Enter product name" required />
                        <div className="error-message">{getErrorMessage('productName')}</div>
                    </div>

                    <div className="input-group description-input-group">
                        <label htmlFor="description" className="input-label">Description:</label>
                        <textarea id="description" name="description" className="text-area-input" rows="4" placeholder="Enter product description" required></textarea>
                        <div className="error-message">{getErrorMessage('description')}</div>
                    </div>

                    <div className="input-group price-input-group">
                        <label htmlFor="price" className="input-label">Price ($):</label>
                        <input type="number" id="price" name="price" className="number-input" placeholder="0.00" step="0.01" required />
                        <div className="error-message">{getErrorMessage('price')}</div>
                    </div>

                    <div className="input-group category-input-group">
                        <label htmlFor="category" className="input-label">Category:</label>
                        <select id="category" name="category" className="text-input-select-category" required>
                            <option value="" disabled selected>Select a category</option>
                            <option value="Holiday">Holiday</option>
                            <option value="Home">Home</option>
                            <option value="Travel">Travel</option>
                            <option value="Accessories">Accessories</option>
                            <option value="Food">Food</option>
                            <option value="Toys">Toys</option>
                        </select>
                        <div className="error-message">{getErrorMessage('category')}</div>
                    </div>

                    <div className="input-group quantity-input-group">
                        <label htmlFor="quantity" className="input-label">Quantity:</label>
                        <input type="number" id="quantity" name="quantity" className="number-input" placeholder="Enter quantity" required />
                        <div className="error-message">{getErrorMessage('quantity')}</div>
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
                                <div className="error-message-images">{getErrorMessage(`image${index + 1}`)}</div>
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
