// Action Types
const LOAD_FAVORITES = 'favorites/LOAD'

// Action Creators

const loadFavorites = (favorites) => {
    console.log('loadFavorites action creator', favorites);
	return {
        type: LOAD_FAVORITES,
	    payload: favorites
    };
};

// Thunks

export const fetchAllFavoritesThunk = (userId) => async (dispatch) => {
    console.log('fetchAllFavoritesThunk', userId)
	const response = await fetch(`/api/favorites/${userId}`, {
		headers: {
			"Content-Type": "application/json",
		},
	});
	if (response.ok) {
		const data = await response.json();
		dispatch(loadFavorites(data.favorites));
	}
};

// Reducer

const initialState = { 
    favorites: [] 
};

export default function favoriteReducer(state = initialState, action) {
	switch (action.type) {
		case LOAD_FAVORITES:
			return { ...state, favorites: action.payload };
		default:
			return state;
	}
}
