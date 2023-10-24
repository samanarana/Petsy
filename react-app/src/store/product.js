// Action Types
const ALL_PRODUCTS = "products/ALL_PRODUCTS";
const GET_PRODUCT_DETAILS = "products/GET_PRODUCT_DETAILS";
const CREATE_PRODUCT = "products/CREATE_PRODUCT";

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

const createProduct = (product) => {
    return {
        type: CREATE_PRODUCT,
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

export const createProductThunk = (productData) => async (dispatch) => {
    try {
        const response = await fetch("/api/products/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(productData),
        });
        if (!response.ok) {
            throw new Error("Failed to create a product");
        }

        const data = await response.json();
        dispatch(createProduct(data));
    } catch (error) {
        console.error("There was an error creating the product:", error);
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
		case CREATE_PRODUCT:
			newState.allProducts = [...newState.allProducts, action.payload];
			return newState;
		default:
			return state;
	}
}
