import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateReviewThunk, getSingleReviewThunk, getReviewThunk } from "../../store/review";
import { useModal } from "../../context/Modal";
import "./UpdateReviewModal.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as fasStar } from '@fortawesome/free-solid-svg-icons';


function UpdateReviewModal({ productId, reviewId }) {
  const dispatch = useDispatch();

  const [description, setDescription] = useState('');
  const [rating, setRating] = useState(1);
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  const [hoveredStar, setHoveredStar] = useState(null);


  useEffect(() => {
    dispatch(getSingleReviewThunk(reviewId))
      .then((review) => {
        setDescription(review.description);
        setRating(review.rating);
      })
      .catch((e) => console.log(e));
  }, [dispatch, reviewId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newReview = {
      description,
      rating
    };

    const data = await dispatch(updateReviewThunk(reviewId, newReview));

    if (data && data.errors) {
        setErrors(data.errors);
    } else {
        dispatch(getReviewThunk(productId));
        closeModal();
    }
  };

  return (
    <div className="update-review-modal">
      <p>Update Review</p>
      <form onSubmit={handleSubmit}>
        <label>
            Description
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className={errors.description ? "input-error" : ""}
                required
            />
            {errors.description && <div className="error-message">{errors.description}</div>}
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


        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default UpdateReviewModal;