import React from "react";
import { useSelector } from "react-redux";
import ProductTile from "../ProductsPage/ProductTile";

const SearchResultsPage = () => {
    const userId = useSelector(state => state.session.user_id);
    const searchResults = useSelector(state => state.product.searchResults) || [];

    return (
        <div className='product-tile-list'>
            {searchResults.length > 0 ? (
                searchResults.map(product => (
                    <ProductTile key={product.id} product={product} userId={userId} />
                ))
            ) : (
                <div>No results found</div>
            )}
        </div>
    );
}

export default SearchResultsPage;
