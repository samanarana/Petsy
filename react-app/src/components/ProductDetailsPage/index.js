import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleProductThunk } from '../../store/product';

function ProductDetailsPage({ productId }) {
    const dispatch = useDispatch();
    const singleProduct = useSelector((state) => state.singleProduct);

    useEffect(() => {
        dispatch(fetchSingleProductThunk(productId));
    }, [dispatch, productId]);

    if (!singleProduct) {
        return <p>Loading...</p>;
    }

    return (
        <div>
          <img src={singleProduct.imgUrl} alt={singleProduct.productName} />
          <h1>{singleProduct.productName}</h1>
          <div>Rating: ★ {singleProduct.avgRating} ({singleProduct.reviewCount} reviews)</div>
          <div>Price: ${singleProduct.price}</div>
        </div>
      );
    }


    export default ProductDetailsPage;
