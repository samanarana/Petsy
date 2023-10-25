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
    const response = await fetch(`/api/cart`, {
    });
    
    if (response.ok) {
        const data = await response.json();
        dispatch(getCartItems(data.cart));
    }
};

export const addToCartThunk = (item) => async (dispatch) => {

    console.log('addToCartThunk item', item)

    const response = await fetch(`/api/cart`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
    });

    if (response.ok) {
        console.log('this is our item', item)
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

    switch (action.type) {
        case GET_CART_ITEMS:
            newState.currentCart = action.payload;
        case ADD_TO_CART:
            newState.currentCart.push(action.payload);
        case REMOVE_CART_ITEM:
            newState.currentCart = newState.currentCart.filter(item => item.id !== action.payload);
        default:
            return state;
    }

    // Save the current cart to localStorage after any change
    localStorage.setItem('currentCart', JSON.stringify(newState.currentCart));
    return newState;
};



  export default cartReducer;
