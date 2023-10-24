// Action Types
const SET_CART_ITEMS = "cart/SET_CART_ITEMS";
const ADD_TO_CART = "cart/ADD_TO_CART";

//Action Creators
const setCartItems = (cartItems) => ({
    type: SET_CART_ITEMS,
    payload: cartItems,
  });

const addToCart = (item) => ({
    type: ADD_TO_CART,
    payload: item,
});

//Thunks
export const fetchCartItemsThunk = () => async (dispatch) => {
    const response = await fetch("/api/cart", {
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(setCartItems(data.cart));
    }
};

export const addToCartThunk = (item) => async (dispatch) => {
    // Log the item about to send
    console.log("Sending item to server:", item);

    const response = await fetch("/api/cart/add", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
    });

    if (response.ok) {
        const data = await response.json();
        console.log("Response data:", data);  // Log the data received from the server
        if (data.success) {
            dispatch(addToCart(item));
        }
    }
};



//Reducer
const initialState = {
    cartItems: [],
};

function cartReducer(state = initialState, action) {
    let newState = {...state};

    switch (action.type) {
        case SET_CART_ITEMS:
            newState.cartItems = action.payload;
            return newState;
        case ADD_TO_CART:
            const itemIdx = newState.cartItems.findIndex(item => item.productId === action.payload.productId);
            if (itemIdx !== -1) {
                newState.cartItems[itemIdx].quantity += action.payload.quantity;
            } else {
                newState.cartItems.push(action.payload);
            }
            return newState;
        default:
            return state;
    }
}

  export default cartReducer;
