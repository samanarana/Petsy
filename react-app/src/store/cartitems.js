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
        headers: {
            "Content-Type": "application/json",
        },
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

    console.log('addToCartThunk response', response)

    if (response.ok) {
        const data = await response.json();
        console.log('ATCT Data, data')
        dispatch(addToCart(data));
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
const initialState = {
    cartItems: [],
};

function cartReducer(state = initialState, action) {
    let newState = {...state};

    switch (action.type) {
        case GET_CART_ITEMS:
            newState.cartItems = action.payload;
            return newState;
        case ADD_TO_CART:
            newState.cartItems = [...newState.cartItems, action.payload];
            return newState;
        case REMOVE_CART_ITEM:
            newState.cartItems = newState.cartItems.filter(item => item.id !== action.payload);
            return newState;
        default:
            return state;
    }
}

  export default cartReducer;
