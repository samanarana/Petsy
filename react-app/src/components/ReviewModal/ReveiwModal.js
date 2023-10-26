import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import "./ReviewModal.css";

function PurchasedProductsModal() {
  const [products, setProducts] = useState([]);
  const sessionUser = useSelector((state) => state.session.user);
  const { closeModal } = useModal();
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/orders/users/products`);

      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      }
    };

    fetchData();
  }, [sessionUser]);

  useEffect(() => {
    document.body.classList.add('modal-open');
    return () => {
        document.body.classList.remove('modal-open');
    };
  }, []);

  const handleReviewClick = (productId) => {
    history.push(`/products/${productId}/reviews/new`);
    closeModal()
  };

  return (
    <div className="purchased-products-modal">
      <div className="title-container">
        <p className="title">Purchased Products</p>
        <p className="text">Leave a review on recently purchased products</p>
      </div>
      <ul className="review-list">
        {products.map((product) => (
          <li key={product.id}>
            <p className="product-name-review">{product.productName}</p>
            <p className="product-description">{product.description}</p>
            <button onClick={() => handleReviewClick(product.id)}>Leave a Review</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PurchasedProductsModal;
