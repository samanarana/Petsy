import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCartThunk } from '../../store/cartitems';
import './CartPage.css';

function CartPage() {
    const dispatch = useDispatch();
    const userCart = useSelector(state => state.cartitems.currentCart);

    const total = userCart.reduce((acc, item) => acc + (item.quantity * item.price), 0);


    const handleRemoveItem = async (productId) => {
        const response = await fetch(`/api/cart/${productId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            }
        });
        if (response.ok) {
            dispatch(removeFromCartThunk(productId));
        }
    };

    return (
        <div className="cart-page">
            <p>{userCart.length} items in your cart</p>

            <div className="main-content">
                <div className="order-items-container">
                    {userCart.map(item => (
                        <div key={item.productId} className="single-item-container">
                            <img src={item.imgUrl} alt={item.productName} className="product-image" />
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
                                <p>{item.description}</p>
                                <p>${item.quantity * item.price}</p>
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
                        <p>Total ({userCart.length} items): ${total + 4.99}</p>
                    </div>

                    <button className="checkout-button">Proceed to checkout</button>
                </div>
            </div>
        </div>
    );

}

export default CartPage;
