
const ADD_REVIEW = "review/ADD_REVIEW";
const GET_REVIEWS = "review/GET_REVIEWS"
const DELETE_REVIEW = "review/DELETE_REVIEW";
const UPDATE_REVIEW = "review/UPDATE_REVIEW"




//action guys

const addReview = (review) => ({
    type: ADD_REVIEW,
    payload: review,
});

const getReviews = (reviews) => ({
    type: GET_REVIEWS,
    payload: reviews
})

const deleteReview = (reviewId) => ({
    type: DELETE_REVIEW,
    payload: reviewId
});

const updateReview = (review) => ({
    type: UPDATE_REVIEW,
    payload: review
})

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

export const getReviewThunk = (productId) => async (dispatch) => {
    const response = await fetch(`/api/products/${productId}/reviews`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        },

    })
    if (response.ok) {
        const data = await response.json();
        dispatch(getReviews(data.reviews))
    }
}

export const deleteReviewThunk = (reviewId) => async (dispatch) => {
    try {
        const response = await fetch(`/api/reviews/${reviewId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to delete review');
        }

        dispatch(deleteReview(reviewId));
    } catch (error) {
        console.error('didnt delete that review:', error);
    }
};

export const updateReviewThunk = (reviewId, updatedReview) => async (dispatch) => {
    try {
        const response = await fetch(`/api/reviews/${reviewId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedReview),
        });
        if (!response.ok) {
            throw new Error('Failed to update this review');
        }
        const data = await response.json();
        dispatch(updateReview(data));
    } catch (error) {
        console.error('didnt update that review', error);
    }
};

export const getSingleReviewThunk = (reviewId) => async (dispatch) => {
    try {
        const response = await fetch(`/api/reviews/${reviewId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error('Failed to fetch review');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch review:', error);
        throw error;
    }
};




const initialState = {
    reviews: [],
};

export default function reducer(state = initialState, action) {
    let newState = { ...state };

    switch (action.type) {
        case GET_REVIEWS:
            newState.reviews = action.payload
            return newState
        case ADD_REVIEW:
            newState.reviews.push(action.payload);
            return newState;
        case DELETE_REVIEW:
            newState.reviews = newState.reviews.filter(review => review.id !== action.payload);
            return newState;
        case UPDATE_REVIEW:
            const index = newState.reviews.findIndex(review => review.id === action.payload);
            if (index !== -1) {
                newState.reviews[index] = action.payload;
            }
            return newState;
        default:
            return state;
    }
}
