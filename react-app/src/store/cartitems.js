// Local Storage -- Cart Persistence
const savedCart = localStorage.getItem('currentCart');
const initialState = {
    currentCart: savedCart ? JSON.parse(savedCart) : [],
};

// Action Types
const GET_CART_ITEMS = "cart/GET_CART_ITEMS";
const ADD_TO_CART = "cart/ADD_TO_CART";
const REMOVE_CART_ITEM = "cart/REMOVE_CART_ITEM";

//Action Creators
const getCartItems = (cartItems) => ({
    type: GET_CART_ITEMS,
    payload: cartItems,
  });

const addToCart = (item) => ({
    type: ADD_TO_CART,
    payload: item,
});

const removeFromCart = (itemId) => ({
    type: REMOVE_CART_ITEM,
    payload: itemId,
});

//Thunks
export const fetchCartItemsThunk = () => async (dispatch) => {
    const response = await fetch(`/api/cart/`, {
    });
    
    if (response.ok) {
        const data = await response.json();
        dispatch(getCartItems(data.cart));
    }
};

export const addToCartThunk = (item) => async (dispatch) => {

    const response = await fetch(`/api/cart`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
    });

    if (response.ok) {
        dispatch(addToCart(item));
    }
};

export const removeFromCartThunk = (itemId) => async (dispatch) => {
    const response = await fetch(`/api/cart/${itemId}`, {
        method: "DELETE",
    });

    if (response.ok) {
            dispatch(removeFromCart(itemId));
    }
};


//Reducer

function cartReducer(state = initialState, action) {
    let newState = {...state};

    //breaks after are required or we won't be hitting the code that allows us to put things in local storage.

    switch (action.type) {
        case GET_CART_ITEMS:
            newState.currentCart = action.payload;
            return newState;

            break;
        case ADD_TO_CART:
            newState.currentCart.push(action.payload);
            return newState;

            break;
        case REMOVE_CART_ITEM:
            const productIdToRemove = action.payload;
            const cartItemIndex = newState.currentCart.findIndex(item => item.productId === productIdToRemove);
            const cartItem = newState.currentCart[cartItemIndex];
        
            if (cartItem && cartItem.quantity > 1) {
                newState.currentCart[cartItemIndex].quantity -= 1;
            }
            else if (cartItem) {
                newState.currentCart.splice(cartItemIndex, 1);
            }
            return newState;

            break;
            
        default:
            return state;
    }

    // Save the current cart to localStorage after any change
    localStorage.setItem('currentCart', JSON.stringify(newState.currentCart));
    return newState;
};



  export default cartReducer;
