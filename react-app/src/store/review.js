
const ADD_REVIEW = "review/ADD_REVIEW";

const addReview = (review) => ({
    type: ADD_REVIEW,
    payload: review,
});

export const addReviewThunk = (productId, review) => async (dispatch) => {
    try {
        const response = await fetch(`/api/products/${productId}/reviews`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(review),
        });

        if (!response.ok) {
            throw new Error('Failed to add review');
        }

        const data = await response.json();
        dispatch(addReview(data));
    } catch (error) {
        console.error('Failed to add review:', error);
    }
};



const initialState = {
    reviews: [],
};

export default function reducer(state = initialState, action) {
    let newState = { ...state };

    switch (action.type) {
        case ADD_REVIEW:
            newState.reviews.push(action.payload);
            return newState;
        default:
            return state;
    }
}
