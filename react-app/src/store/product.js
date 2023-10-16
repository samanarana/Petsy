// constants
const ALL_PRODUCTS = "products/ALL_PRODUCTS";

// action creators
const setProducts = (products) => ({
	type: ALL_PRODUCTS,
	payload: products,
});

const initialState = { products: [] };

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

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case ALL_PRODUCTS:
			return { products: action.payload };
		default:
			return state;
	}
}
