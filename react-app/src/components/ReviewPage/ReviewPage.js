// import React, { useState, useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { useParams, useHistory } from 'react-router-dom';
// import { addReviewThunk, updateReviewThunk, getSingleReviewThunk } from '../../store/review';

// function ReviewFormPage() {
//   const [description, setDescription] = useState('');
//   const [rating, setRating] = useState(1);

//   const { productId, reviewId } = useParams();
//   const dispatch = useDispatch();
//   const history = useHistory();

//   useEffect(() => {
//     if (reviewId) {
//       dispatch(getSingleReviewThunk(reviewId))
//         .then((review) => {
//           setDescription(review.description);
//           setRating(review.rating);
//         })
//         .catch((e) => console.log(e));
//     }
//   }, [dispatch, reviewId]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const newReview = {
//       description,
//       rating
//     };
//     if (reviewId) {
//       await dispatch(updateReviewThunk(reviewId, newReview));
//     } else {
//       await dispatch(addReviewThunk(productId, newReview));
//     }
//     history.push(`/products/${productId}`);
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <textarea
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           required
//         />
//         <select
//           value={rating}
//           onChange={(e) => setRating(e.target.value)}
//           required
//         >
//           <option value="1">1</option>
//           <option value="2">2</option>
//           <option value="3">3</option>
//           <option value="4">4</option>
//           <option value="5">5</option>
//         </select>
//         <button type="submit">{reviewId ? 'Update' : 'Submit'}</button>
//       </form>
//     </div>
//   );
// }

// export default ReviewFormPage;
