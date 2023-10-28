import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCartThunk, fetchCartItemsThunk, updateCartItemQuantityThunk, clearCartThunk } from '../../store/cartitems';
import { fetchAllProductsThunk } from '../../store/product';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import './CartPage.css';

function CartPage() {
    const dispatch = useDispatch();

    const userCart = useSelector(state => state.cartitems.currentCart);
    const allProducts = useSelector(state => state.product.allProducts);

    //Field-Selector States
    const [ isLoaded, setIsLoaded ] = useState(false)
    const [error, setError] = useState(null)
    const [selectedQuantities, setSelectedQuantities] = useState({});


    useEffect(() => {
        Promise.all([dispatch(fetchAllProductsThunk()), dispatch(fetchCartItemsThunk())])
        .then(() => setIsLoaded(true))
        .catch(error => {
            setError("this is not working");
            setIsLoaded(false);
        });
    }, [dispatch]);


    const handleRemoveItem = (productId) => {
        dispatch(removeFromCartThunk(productId))
        dispatch(fetchCartItemsThunk());
    };


    const handleClearCart = () => {
        dispatch(clearCartThunk())
       };


       const handleUpdateCartItemQuantity = (productId, newQuantity) => {
        if (newQuantity <= MAX_QUANTITY) {
            dispatch(updateCartItemQuantityThunk(productId, newQuantity));
        } else {
            setError(`You can't have more than ${MAX_QUANTITY} of this product in your cart.`);
        }
    }

    if(!isLoaded) {
        return <div>Loading...</div>
    }

    //Cost-related
    const totalCost = userCart.reduce((acc, item) => acc + (item.quantity * item.price), 0).toFixed(2);
    const withShipping = (Number(totalCost) + 4.99).toFixed(2);
    const totalItems = userCart.reduce((acc, item) => acc + item.quantity, 0);
    const MAX_QUANTITY = 10;

    return (
        <div className="cart-page">
            {userCart.length === 0 ? (
                <>
                    <p className="cart-is-empty">Your cart is empty.</p>
                    <Link to="/products" className="link-all-products">Discover something unique to fill it up</Link>
                </>

            ) : (
            <>
                <p className="items-in-cart">
                    {totalItems} {totalItems === 1 ? 'item' : 'items'} in your cart
                </p>
            <button
                    className="clear-button"
                    onClick={() => handleClearCart()}
                > Clear Cart</button>
            <div className="main-content">
                <div className="order-items-container">
                    {userCart.map(item => {
                        const productDetails = allProducts.find(product => product.id === item.productId);
                        return productDetails ? (

                            <div key={item.productId} className="single-item-container">
                                <img src={productDetails.imageUrls[0]} alt={productDetails.productName} className="product-image" />

                                <div className="order-info">
                                    <div className="top-section">
                                        <span className="product-name-cart">{productDetails.productName}</span>
                                        <span className="product-price">${(productDetails.price * item.quantity).toFixed(2)}</span>
                                    </div>
                                    <div className="bottom-section">
                                        <div className="dropdown-container">
                                            <select
                                                className="quantity-dropdown-cart"
                                                value={selectedQuantities[item.productId] || item.quantity}
                                                onChange={(e) => {
                                                    const updatedQuantities = {
                                                        ...selectedQuantities,
                                                        [item.productId]: Number(e.target.value)
                                                    };
                                                    setSelectedQuantities(updatedQuantities);
                                                    handleUpdateCartItemQuantity(item.productId, Number(e.target.value));
                                                }}
                                            >
                                                {
                                                    Array.from({ length: Math.min(MAX_QUANTITY, item.quantity + 1) }, (_, i) => i + 1).map(qty => (
                                                        <option key={qty} value={qty}>{qty}</option>
                                                    ))
                                                }
                                            </select>

                                            <FontAwesomeIcon icon={faChevronDown} className="dropdown-icon" />
                                        </div>
                                    </div>
                                    <button
                                            className="remove-button"
                                            onClick={() => handleRemoveItem(item.productId)}
                                            >
                                            Remove
                                    </button>
                                </div>
                            </div>
                        ) : null;
                    })}
                </div>

                <div className="checkout-section">
                <div className="checkout-line">
                    <span className="checkout-label">Item(s) total:</span>
                    <span className="checkout-value">${totalCost}</span>
                </div>
                <hr />
                <div className="checkout-line">
                    <span className="checkout-label">Shipping:</span>
                    <span className="checkout-value">$4.99</span>
                </div>
                <hr />
                <div className="checkout-line">
                    <span className="checkout-label">Total ({totalItems} {totalItems === 1 ? 'item' : 'items'}):</span>
                    <span className="checkout-value">${withShipping}</span>
                </div>

                    <button className="checkout-button">Proceed to checkout</button>
                </div>
            </div>
            </>
        )}
        </div>
    );
}

export default CartPage;
