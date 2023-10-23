import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { addReviewThunk } from '../../store/review';

function ReviewFormPage() {
    const [description, setDescription] = useState('');
    const [rating, setRating] = useState(1);

    const { productId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const review = {
            description,
            rating
        };
        await dispatch(addReviewThunk(productId, review));
        history.push(`/products/${productId}`);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                <select
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    required
                >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                <button type="submit">Submit Review</button>
            </form>
        </div>
    );
}

export default ReviewFormPage;
