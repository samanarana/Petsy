// Action Types
const LOAD_FAVORITES = 'favorites/LOAD';
const ADD_FAVORITE = 'favorites/ADD';
const REMOVE_FAVORITE = 'favorites/REMOVE';

// Action Creators

const loadFavorites = (favorites) => {
	return {
        type: LOAD_FAVORITES,
	    payload: favorites
    };
};

const addFavorite = (favoriteId) => {
    return {
        type: ADD_FAVORITE,
        payload: favoriteId
    };
};

const removeFavorite = (productId) => {
    return {
        type: REMOVE_FAVORITE,
        payload: productId
    };
};

// Thunks

export const fetchAllFavoritesThunk = (userId) => async (dispatch) => {
	const response = await fetch(`/api/users/${userId}/favorites`, {
		headers: {
			"Content-Type": "application/json",
		},
	});
	if (response.ok) {
		const data = await response.json();
		dispatch(loadFavorites(data.favorites));
	}
};

export const addFavoriteThunk = (userId, productId) => async (dispatch) => {
    const response = await fetch(`/api/users/${userId}/favorites`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId })
    });

    if (response.ok) {
        const newFavorite = await response.json();
        dispatch(addFavorite(newFavorite));
    }
};

export const removeFavoriteThunk = (userId, productId) => async (dispatch) => {
    const response = await fetch(`/api/users/${userId}/favorites/${productId}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        dispatch(removeFavorite(productId));
    }
};


// Reducer

const initialState = {
    favorites: [],
};

export default function favoriteReducer(state = initialState, action) {

    switch (action.type) {
        case LOAD_FAVORITES:
            return { ...state, favorites: action.payload };

		case ADD_FAVORITE:
			return {
				...state,
				favorites: [...state.favorites, action.payload],
			};
		case REMOVE_FAVORITE:
			return {
				...state,
				favorites: state.favorites.filter(
					(favorite) => favorite.productId !== action.payload
					),
			};
        default:
            return state;
    }
}
