import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as fasStar } from '@fortawesome/free-solid-svg-icons';
import { addReviewThunk } from '../../store/review';
import { useModal } from "../../context/Modal";
import "./LeaveReviewModal.css"

import { useHistory, useLocation } from 'react-router-dom';


function ReviewFormModal({ productId }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const history = useHistory();
  const location = useLocation();


  const [description, setDescription] = useState('');
  const [rating, setRating] = useState(1);
  const [hoveredStar, setHoveredStar] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handleSubmit triggered");

    if (description.length < 10) {
      console.log("Setting error message...");
      setErrorMessage("Give us a little bit longer of a review.");
      return;
  }

    const newReview = {
      description,
      rating
    };
    await dispatch(addReviewThunk(productId, newReview));
    closeModal();
    const newPath = location.pathname.replace(/products\/.*$/, '') + `products/${productId}`;
    history.push(newPath);


  };

  return (
    <div className="purchased-products-modal-new">
      <div className="title-container">
        <p className="title">Leave a Review</p>
      </div>
      <form onSubmit={handleSubmit}>
      <label className="description-label-form">
          Leave a review:
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
