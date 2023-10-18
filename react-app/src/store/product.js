// constants
const ALL_PRODUCTS = "products/ALL_PRODUCTS";
const SINGLE_PRODUCT = "products/SINGLE_PRODUCT";

// action creators
const setProducts = (products) => ({
	type: ALL_PRODUCTS,
	payload: products,
});

const setSingleProduct = (product) => ({
	type: SINGLE_PRODUCT,
	payload: product,
  });



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

export const fetchSingleProductThunk = (productId) => async (dispatch) => {
	const response = await fetch(`/api/products/${productId}`);
	if (response.ok) {
	  const data = await response.json();
	  dispatch(setSingleProduct(data));
	}
  };



const initialState = { products: [], singleProduct: null };

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case ALL_PRODUCTS:
			return { products: action.payload };
		case SINGLE_PRODUCT:
      		return { ...state, singleProduct: action.payload };
		default:
			return state;
	}
}
