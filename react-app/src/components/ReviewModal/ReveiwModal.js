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

  const handleReviewClick = (productId) => {
    history.push(`/products/${productId}/reviews/new`);
    closeModal()
  };

  return (
    <div className="purchased-products-modal">

      <h2>Purchased Products</h2>
      <h3>Leave a review on recently purchased products</h3>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <button onClick={() => handleReviewClick(product.id)}>Leave a Review</button>
          </li>
        ))}
      </ul>
      <button onClick={closeModal}>Close</button>
    </div>
  );
}

export default PurchasedProductsModal;
