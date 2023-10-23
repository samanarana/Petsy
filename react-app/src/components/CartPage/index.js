import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCartItemsThunk } from '../../store/cartitems';
import './CartPage.css';

function CartPage() {
    const dispatch = useDispatch();

    const cartItems = useSelector(state => state.cartitems.cartItems);

    const total = cartItems.reduce((acc, item) => acc + (item.quantity * item.price), 0);


    const handleRemoveItem = async (productId) => {
        const response = await fetch(`/api/cart/${productId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            }
        });
        if (response.ok) {
            dispatch(fetchCartItemsThunk());
        }
    };


    return (
        <div className="cart-page">
            <p>{cartItems.length} items in your cart</p>

            <div className="main-content">
                <div className="order-items-container">
                    {cartItems.map(item => (
                        <div key={item.id} className="single-item-container">
                            <img src={item.product.imgUrl} alt={item.product.productName} className="product-image" />
                            <button
                                className="remove-button"
                                onClick={() => handleRemoveItem(item.productId)}
                            >
                                Remove
                            </button>
                            <div className="order-info">
                                <select value={item.quantity}>
                                    {[1, 2, 3, 4, 5].map(qty => (
                                        <option key={qty} value={qty}>{qty}</option>
                                    ))}
                                </select>
                                <p>{item.product.description}</p>
                                <p>${item.quantity * item.product.price}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="checkout-section">
                    <div className="payment-section">
                        <p>Item(s) total: ${total}</p>
                        <hr />
                        <p>Shipping: $4.99</p>
                        <hr />
                        <p>Total ({cartItems.length} items): ${total + 4.99}</p>
                    </div>

                    <button className="checkout-button">Proceed to checkout</button>
                </div>
            </div>
        </div>
    );

}

export default CartPage;
