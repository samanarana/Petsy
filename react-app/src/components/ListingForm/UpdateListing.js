import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { updateProductThunk, productDetailsThunk } from './../../store/product';
import './UpdateListing.css';

const UpdateListing = () => {
    const { productId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const product = useSelector(state => state.product.productDetails);

    const [productData, setProductData] = useState({
        productName: '',
        description: '',
        price: '',
        category: '',
        quantity: '',
        imageUrls: Array(6).fill(''),
    });

    useEffect(() => {
        if(!product.productName && productId) {
            dispatch(productDetailsThunk(productId));
        }
    }, [dispatch, productId, product.productName]);

    useEffect(() => {

        // Use product details from store to set local state
        if (product && product.productName && !productData.productName) {
            setProductData({
                productName: product.productName,
                description: product.description,
                price: product.price,
                category: product.category,
                quantity: product.quantity,
                imageUrls: product.imageUrls || Array(6).fill(''),
            });
        }
    }, [dispatch, productId, product, product.productName, productData.productName]);

    const handleUpdateProduct = (event) => {
        event.preventDefault();

        dispatch(updateProductThunk(productId, productData))
        .then(() => {
            history.push("/listings");
        });
    };

    return (
        <div className="main-container">
            <div className="update-listing-container">
                <form className="update-listing-form" onSubmit={handleUpdateProduct}>
                    <h2 className="update-listing-title">Update Listing</h2>

                    <div className="input-group title-input-group">
                        <label htmlFor="productName" className="input-label">Product Name:</label>
                        <input
                            type="text"
                            id="productName"
                            name="productName"
                            className="text-input"
                            placeholder="Enter product name"
                            value={productData.productName}
                            onChange={e => setProductData({ ...productData, productName: e.target.value })}
                            required
                        />
                    </div>

                    <div className="input-group description-input-group">
                        <label htmlFor="description" className="input-label">Description:</label>
                        <textarea
                            id="description"
                            name="description"
                            className="text-area-input"
                            rows="4"
                            placeholder="Enter product description"
                            value={productData.description}
                            onChange={e => setProductData({ ...productData, description: e.target.value })}
                            required>
                        </textarea>
                    </div>

                    <div className="input-group price-input-group">
                        <label htmlFor="price" className="input-label">Price ($):</label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            className="number-input"
                            placeholder="0.00"
                            value={productData.price}
                            onChange={e => setProductData({ ...productData, price: e.target.value })}
                            step="0.01"
                            required
                        />
                    </div>

                    <div className="input-group category-input-group">
                        <label htmlFor="category" className="input-label">Category:</label>
                        <input
                            type="text"
                            id="category"
                            name="category"
                            className="text-input"
                            placeholder="Enter product category"
                            value={productData.category}
                            onChange={e => setProductData({ ...productData, category: e.target.value })}
                            required
                        />
                    </div>

                    <div className="input-group quantity-input-group">
                        <label htmlFor="quantity" className="input-label">Quantity:</label>
                        <input
                            type="number"
                            id="quantity"
                            name="quantity"
                            className="number-input"
                            placeholder="Enter quantity"
                            value={productData.quantity}
                            onChange={e => setProductData({ ...productData, quantity: e.target.value })}
                            required
                        />
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
                                        value={productData.imageUrls[index]}
                                        onChange={e => {
                                            let newImageUrls = [...productData.imageUrls];
                                            newImageUrls[index] = e.target.value;
                                            setProductData({ ...productData, imageUrls: newImageUrls });
                                        }}
                                    />
                                    <span className="or-separator">or</span>
                                    <input
                                        type="file"
                                        id={`imageFile${index + 1}`}
                                        name={`imageFile${index + 1}`}
                                        className="file-input"
                                        accept=".jpg, .jpeg, .png"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    <button type="submit" className="update-listing-button-form">Update Listing</button>
                </form>
            </div>
        </div>
    );
}

export default UpdateListing;
