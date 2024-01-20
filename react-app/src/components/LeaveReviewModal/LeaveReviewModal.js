import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as fasStar } from '@fortawesome/free-solid-svg-icons';
import { addReviewThunk } from '../../store/review';
import { useModal } from "../../context/Modal";
import "./LeaveReviewModal.css"

import { useHistory } from 'react-router-dom';


function ReviewFormModal({ productId }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const history = useHistory();



  const [description, setDescription] = useState('');
  const [rating, setRating] = useState(1);
  const [hoveredStar, setHoveredStar] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (description.length < 10) {
      setErrorMessage("Give us a little bit longer of a review.");
      return;
  }

    const newReview = {
      description,
      rating
    };
    await dispatch(addReviewThunk(productId, newReview));
    closeModal();
    history.push(`/products/${productId}`);


  };

  return (
    <div className="purchased-products-modal-new">
      <div className="title-container">
        <p className="title">Leave a Review</p>
      </div>
      <form onSubmit={handleSubmit}>
      <label className="description-label-form">
         
          <textarea
          className="description-review"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </label>
        <div className="rating-container">
            {Array(5).fill(null).map((_, idx) => (
                <FontAwesomeIcon
                    key={idx}
                    icon={fasStar}
                    className={`review-star ${idx < rating ? "selected" : ""}`}
                    onMouseEnter={() => setHoveredStar(idx + 1)}
                    onMouseLeave={() => setHoveredStar(null)}
                    onClick={() => setRating(idx + 1)}
                    style={idx < (hoveredStar || rating) ? {color: "#FFD700"} : {}}
                />
            ))}
        </div>
        <button className="submit-button" type="submit" >Submit</button>
      </form>
    </div>
  );
}

export default ReviewFormModal;
