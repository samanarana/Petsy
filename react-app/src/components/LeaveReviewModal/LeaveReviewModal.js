import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import { addReviewThunk } from '../../store/review';
import { useModal } from "../../context/Modal";
import "./LeaveReviewModal.css"

function ReviewFormModal({ productId }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const [description, setDescription] = useState('');
  const [rating, setRating] = useState(1);

  const handleStarClick = (starRating) => {
    setRating(starRating);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newReview = {
      description,
      rating
    };
    await dispatch(addReviewThunk(productId, newReview));
    closeModal();
  };

  return (
    <div className="purchased-products-modal">
      <div className="title-container">
        <p className="title">Leave a Review</p>
      </div>
      <form onSubmit={handleSubmit}>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <div className="star-rating">
          {[1, 2, 3, 4, 5].map((starValue) => (
            <FontAwesomeIcon
              key={starValue}
              icon={starValue <= rating ? solidStar : regularStar}
              onClick={() => handleStarClick(starValue)}
              className="star-icon"
            />
          ))}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default ReviewFormModal;
