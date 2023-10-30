import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProductsThunk } from '../../store/product';
import HolidayTile from './HolidayTile';
import './HolidayRandom.css';

function HolidayRandom() {
    const dispatch = useDispatch();
    const history = useHistory();
    const allProducts = useSelector(state => state.product.allProducts);
    const [randomProducts, setRandomProducts] = useState([]);

    useEffect(() => {
        dispatch(fetchAllProductsThunk());
    }, [dispatch]);

    useEffect(() => {
        // Get a random subset of products
        const randomSubset = [...allProducts].sort(() => 0.5 - Math.random()).slice(0, 7); // 7 random products
        setRandomProducts(randomSubset);
    }, [allProducts]);

    // Navigate to the /products page
    const navigateToProducts = () => {
        history.push('/products');
    }

    return (
        <div className="holiday-page-thing">
            <div className="holiday-section-container">
                <div className="small-tiles">
                    <div className="holiday-header">
                        <p>Editor's Picks</p>
                        <p className="second-header">Shop For Your Furry Friends!</p>
                        <button className="see-more" onClick={navigateToProducts}>See more →</button>
                    </div>
                    {/* Render only first 6 products for small tiles */}
                    {randomProducts.slice(0, 6).map(product => (
                        <HolidayTile key={product.id} product={product} id={product.id} history={history} />
                    ))}
                </div>
            </div>
            <div className="holiday-section-container-right">
                <div className="large-tile">
                    {/* Render only 7th product for the large tile */}
                    {randomProducts[6] && <HolidayTile isLarge={true} className="large-holiday-tile" key={randomProducts[6].id} product={randomProducts[6]} id={randomProducts[6].id} history={history} />}
                </div>
            </div>
        </div>
    );

}

export default HolidayRandom;
