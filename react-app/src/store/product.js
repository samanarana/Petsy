// Action Types
const ALL_PRODUCTS = "products/ALL_PRODUCTS";
const GET_PRODUCT_DETAILS = "products/GET_PRODUCT_DETAILS";

// Action Creators
const loadProducts = (products) => ({
	type: ALL_PRODUCTS,
	payload: products,
});

const productDetails = (product) => {
	// console.log(product)
    return {
        type: GET_PRODUCT_DETAILS,
        payload: product
    };
};

// Thunks

export const fetchAllProductsThunk = () => async (dispatch) => {
	const response = await fetch("/api/products/", {
		headers: {
			"Content-Type": "application/json",
		},
	});
	if (response.ok) {
		const data = await response.json();
		dispatch(loadProducts(data.products));
	}
};

export const productDetailsThunk = (productId) => async (dispatch) => {
    try {
        const response = await fetch(`/api/products/${productId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch product details');
        }

        const data = await response.json();
		// console.log('data in productDetailsThunk', data.id)
        dispatch(productDetails(data));
    } catch (error) {
        console.error("There was an error fetching the product details:", error);
    }
};

//reducer
const initialState = {
    allProducts: [],
    userProducts: [],
    productDetails: [],
    list: [],
};

export default function reducer(state = initialState, action) {

	let newState = {...state};

	switch (action.type) {
		case ALL_PRODUCTS:
			newState.allProducts = action.payload;
			return newState
		case GET_PRODUCT_DETAILS:
			newState.productDetails = action.payload;
			return newState
		default:
			return state;
	}
}
