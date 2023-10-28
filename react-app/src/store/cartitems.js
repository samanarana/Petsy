// Action Types
const GET_CART_ITEMS = "cart/GET_CART_ITEMS";
const ADD_TO_CART = "cart/ADD_TO_CART";
const REMOVE_CART_ITEM = "cart/REMOVE_CART_ITEM";
const CLEAR_CART = "cart/CLEAR_CART"
const UPDATE_CART_ITEM_QUANTITY = "cart/UPDATE_CART_ITEM_QUANTITY";

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

const clearCart = () => ({
    type: CLEAR_CART,
    payload: null
});

const updateCartItemQuantity = (productId, quantity) => ({
    type: UPDATE_CART_ITEM_QUANTITY,
    payload: {
        productId,
        quantity
    },
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

export const clearCartThunk = () => async (dispatch) => {
    const response = await fetch(`/api/cart/clear`, {
        method: "DELETE"
    });

    if (response.ok) {
        dispatch(clearCart())
    };
}

export const updateCartItemQuantityThunk = (itemId, quantity) => async (dispatch) => {
    const response = await fetch(`/api/cart/${itemId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity }),
    });

    if (response.ok) {
        dispatch(updateCartItemQuantity(itemId, quantity));
    }
};


// State

const initialState = {
    currentCart: [],
};


//Reducer

function cartReducer(state = initialState, action) {
    let newState = {...state};

    switch (action.type) {
        case GET_CART_ITEMS:
            newState.currentCart = action.payload;
            return newState;

        case ADD_TO_CART:
            newState.currentCart = [...newState.currentCart, action.payload];
            return newState;

        case REMOVE_CART_ITEM:
            const productIdToRemove = action.payload;
            newState.currentCart = newState.currentCart.map(item => {
                if (item.productId === productIdToRemove && item.quantity > 1) {
                    return { ...item, quantity: item.quantity - 1 };
                }
                return item;
            }).filter(item => !(item.productId === productIdToRemove && item.quantity <= 1));
            return newState;

        case UPDATE_CART_ITEM_QUANTITY:
            newState.currentCart = newState.currentCart.map(item => {
                if (item.productId === action.payload.productId) {
                    return { ...item, quantity: action.payload.quantity };
                }
                return item;
            });
                return newState;

        case CLEAR_CART:
            newState.currentCart = [];
            return newState;
        default:
            return state;
    };
};

export default cartReducer;
