// constants
const ALL_PRODUCTS = "products/ALL_PRODUCTS";
const GET_PRODUCT_DETAILS = "products/GET_PRODUCT_DETAILS";

// action creators
const setProducts = (products) => ({
	type: ALL_PRODUCTS,
	payload: products,
});

export const getProductDetails = (product) => {
    return {
        type: GET_PRODUCT_DETAILS,
        product,
    };
};



export const fetchAllProductsThunk = () => async (dispatch) => {
	const response = await fetch("/api/products/", {
		headers: {
			"Content-Type": "application/json",
		},
	});
	if (response.ok) {
		const data = await response.json();
		dispatch(setProducts(data.products));
	}
};

export const productDetailsThunk = (productId) => async (dispatch) => {
    try {
        const response = await fetch(`/api/products/${productId}`);

        if (!response.ok) {
            throw new Error('Failed to fetch product details');
        }

        const data = await response.json();

        dispatch(getProductDetails(data));
    } catch (error) {
        console.error("There was an error fetching the product details:", error);
    }
};

//reducer
const initialState = {
    allProducts: [],
    userProducts: [],
    productDetails: null,
    list: [],
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case ALL_PRODUCTS:
			return { ...state, allProducts: action.payload };
		case GET_PRODUCT_DETAILS:
			return {
				...state,
				productDetails: action.product
			};
		default:
			return state;
	}
}
