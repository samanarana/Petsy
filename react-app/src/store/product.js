// Action Types
const ALL_PRODUCTS = "products/ALL_PRODUCTS";
const GET_PRODUCT_DETAILS = "products/GET_PRODUCT_DETAILS";
const CREATE_PRODUCT = "products/CREATE_PRODUCT";
const UPDATE_PRODUCT = "products/UPDATE_PRODUCT";
const DELETE_PRODUCT = "products/DELETE_PRODUCT";

// Action Creators
const loadProducts = (products) => ({
	type: ALL_PRODUCTS,
	payload: products
});

const productDetails = (product) => ({
    type: GET_PRODUCT_DETAILS,
    payload: product
});

const createProduct = (product) => ({
    type: CREATE_PRODUCT,
    payload: product
});

const updateProduct = (product) => ({
    type: UPDATE_PRODUCT,
    payload: product
});

const deleteProduct = (productId) => ({
    type: DELETE_PRODUCT,
    payload: productId
});

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
            const errorData = await response.json();
            console.error("Server Error:", errorData);
            throw new Error('Failed to fetch product details');
        }

        const data = await response.json();
        dispatch(productDetails(data));
        return data;  // return fetched product
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

export const updateProductThunk = (productId, productData) => async (dispatch) => {
    try {
        const response = await fetch(`/api/products/${productId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(productData),
        });
        if (!response.ok) {
            throw new Error("Failed to update the product");
        }

        const data = await response.json();
        dispatch(updateProduct(data));
    } catch (error) {
        console.error("There was an error updating the product:", error);
    }
};

export const deleteProductThunk = (productId) => async (dispatch) => {
    try {
        const response = await fetch(`/api/products/${productId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            throw new Error("Failed to delete the product");
        }

        dispatch(deleteProduct(productId));
    } catch (error) {
        console.error("There was an error deleting the product:", error);
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
        case UPDATE_PRODUCT:
            newState.allProducts = newState.allProducts.map(product =>
            product.id === action.payload.id ? action.payload : product
            );
            return newState;
        case DELETE_PRODUCT:
            newState.allProducts = newState.allProducts.filter(product =>
            product.id !== action.payload
            );
            return newState;
		default:
			return state;
	}
}
