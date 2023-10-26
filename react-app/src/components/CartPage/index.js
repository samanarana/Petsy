import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCartThunk, fetchCartItemsThunk } from '../../store/cartitems';
import { fetchAllProductsThunk } from '../../store/product';
import './CartPage.css';

function CartPage() {
    const dispatch = useDispatch();

    //Product-related
    const userCart = useSelector(state => state.cartitems.currentCart);
    const allProducts = useSelector(state => state.product.allProducts);
    const cartImages = userCart.map(item => {
        const itemDetails = allProducts.find(product => product.id === item.productId);
        return itemDetails && itemDetails.imageUrls && itemDetails.imageUrls[0] ? itemDetails.imageUrls[0] : null;
    });
    const cartProductDetails = userCart.map(item => {
        return allProducts.find(product => product.id === item.productId)
        
    });

    console.log('cartProductDetails ----------------', cartProductDetails)

    //Cost-related
    const totalCost = userCart.reduce((acc, item) => acc + (item.quantity * item.price), 0).toFixed(2);
    const totalQuantity = userCart.reduce((accumulator, currentCartItem) => {
        return accumulator + currentCartItem.quantity;
    }, 0);
    const withShipping = (Number(totalCost) + 4.99).toFixed(2);
    //We can edit the 4.99 value in the future to be a shipping
    //price variable, but hard-coding should be fine for now.

    
    //Field-Selector States
    const [ isLoaded, setIsLoaded ] = useState(false)

    useEffect(() => {
        dispatch(fetchAllProductsThunk());
        dispatch(fetchCartItemsThunk())
        .then(() => setIsLoaded(true));
    }, [dispatch])

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

    if(!isLoaded || !cartProductDetails) {
        return <div>Loading...</div>
    }
    //this is another loading part that we may want to update
    //to look a lil more professional
    

    return (
        <div className="cart-page">
            <p>{totalQuantity} items in your cart</p>

            <div className="main-content">
                <div className="order-items-container">
                    {userCart.map((item, index) => (
                        <div key={item.productId} className="single-item-container">
                            <img src={cartImages[index]} alt={'missing image'} className="product-image" />
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
                                <p>Description: {cartProductDetails.description}</p>
                                <p>Price: ${cartProductDetails.price}</p>

                            </div>
                        </div>
                    ))}
                </div>

                <div className="checkout-section">
                    <div className="payment-section">
                        <p>Item(s) total: ${totalCost}</p>
                        <hr />
                        <p>Shipping: $4.99</p>
                        <hr />
                        <p>Total ({totalQuantity} items): ${withShipping} </p>
                    </div>

                    <button className="checkout-button">Proceed to checkout</button>
                </div>
            </div>
        </div>
    );

}

export default CartPage;
