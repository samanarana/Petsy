import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import "./ReviewModal.css";
import ReviewFormModal from "../LeaveReviewModal/LeaveReviewModal";
import { Link } from "react-router-dom";

function PurchasedProductsModal() {
  const [products, setProducts] = useState([]);
  const sessionUser = useSelector((state) => state.session.user);
  const { closeModal, openModal } = useModal();
  const [userReviews, setUserReviews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/orders/users/products`);
      if (response.ok) {
        const data = await response.json();
        const uniqueProducts = [];
        const productIds = new Set();
        for (let i = 0; i < data.length; i++) {
          const product = data[i];
          if (!productIds.has(product.id)) {
            uniqueProducts.push(product);
            productIds.add(product.id);
          }
        }
        setProducts(uniqueProducts);
      }
    };

    const fetchUserReviews = async () => {
      const response = await fetch('/api/reviews/user');
      if (response.ok) {
        const data = await response.json();
        setUserReviews(data.user_reviews);
      }
    };

    fetchData();
    fetchUserReviews();
  }, [sessionUser]);

  useEffect(() => {
    document.body.classList.add('modal-open');
    return () => {
        document.body.classList.remove('modal-open');
    };
  }, []);

  const handleReviewClick = (productId) => {
    closeModal();
    openModal(<ReviewFormModal productId={productId} />);
  };

  return (
    <div className="purchased-products-modal">
      <div className="title-container">
        <p className="title">Purchased Products</p>
        <p className="text">Leave a review on recently purchased products</p>
      </div>
      <ul className="review-list">
        {products.map((product) => {
          const matchingReview = userReviews.find(review => review.productId === product.id);
          const hasReviewed = Boolean(matchingReview);
          return (
            <li key={product.id}>
              <Link to={`/products/${product.id}`} className="product-name-review"
                onClick={closeModal}>
              {product.productName}
            </Link>

              <p className="product-description">{product.description}</p>
              <button
                onClick={() => handleReviewClick(product.id)}
                disabled={hasReviewed}
              >
                {hasReviewed ? 'Already Reviewed' : 'Leave a Review'}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default PurchasedProductsModal;
