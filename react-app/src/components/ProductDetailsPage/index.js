import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { productDetailsThunk } from '../../store/product';

import { useParams } from "react-router-dom";

function ProductDetailsPage() {
    const { productId } = useParams();
    console.log("Product ID:", productId);
    const dispatch = useDispatch();
    const product = useSelector(state => state.product.productDetails);
    console.log("Product ID:", productId);
    useEffect(() => {
      dispatch(productDetailsThunk(productId))

    }, [dispatch, productId]);

    if (!product) return null;

    return (
      <div>
        <img src={product.imgUrl} alt={product.productName} />
        <h1>{product.productName}</h1>
        <div>Rating: ★ {product.avgRating} ({product.reviewCount} reviews)</div>
        <div>Price: ${product.price}</div>
      </div>
  );
}


    export default ProductDetailsPage;
