import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCartThunk, fetchCartItemsThunk, clearCartThunk } from '../../store/cartitems';
import { fetchAllProductsThunk } from '../../store/product';

import './CartPage.css';

function CartPage() {
    const dispatch = useDispatch();

    const userCart = useSelector(state => state.cartitems.currentCart);
    const allProducts = useSelector(state => state.product.allProducts);

    //Field-Selector States
    const [ isLoaded, setIsLoaded ] = useState(false)
    const [error, setError] = useState(null)

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
        .then(() => {
            dispatch(fetchCartItemsThunk())
        });
    };

    const handleClearCart = () => {
        dispatch(clearCartThunk())
       };
    

    if(!isLoaded) {
        return <div>Loading...</div>
    }

    //Cost-related
    const totalCost = userCart.reduce((acc, item) => acc + (item.quantity * item.price), 0).toFixed(2);
    const withShipping = (Number(totalCost) + 4.99).toFixed(2);


    return (
        <div className="cart-page">
            <p>{userCart.length} items in your cart</p>

            <div className="main-content">
                <button
                    className='clear-button'
                    onClick={() => handleClearCart()}
                > Clear Cart</button>
                <div className="order-items-container">
                    {userCart.map(item => {
                        const productDetails = allProducts.find(product => product.id === item.productId);
                        return productDetails ? (
                            <div key={item.productId} className="single-item-container">
                                <img src={productDetails.imageUrls[0]} alt={productDetails.productName} className="product-image" />
                                <button
                                    className="remove-button"
                                    onClick={() => handleRemoveItem(item.productId)}
                                >
                                    Remove
                                </button>
                                <div className="order-info">

                                    {/*
                                This needs an update, it was returning:
                                You provided a `value` prop to a form field without an `onChange` handler.
                                This will render a read-only field. If the field should be mutable use `defaultValue`.
                                Otherwise, set either `onChange` or `readOnly`.
                                */}

                                {/* <select value={item.quantity}>
                                    {[1, 2, 3, 4, 5].map(qty => (
                                        <option key={qty} value={qty}>{qty}</option>
                                    ))}
                                </select> */}

                                    <p>Description: {productDetails.description}</p>
                                    <p>Price: ${productDetails.price}</p>
                                </div>
                            </div>
                        ) : null;
                    })}
                </div>

                <div className="checkout-section">
                    <div className="payment-section">
                        <p>Item(s) total: ${totalCost}</p>
                        <hr />
                        <p>Shipping: $4.99</p>
                        <hr />
                        <p>Total ({userCart.length} items): ${withShipping} </p>
                    </div>

                    <button className="checkout-button">Proceed to checkout</button>
                </div>
            </div>
        </div>
    );
}

export default CartPage;
