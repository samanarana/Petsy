import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import CategoryNav from './CategoryNav.js';
import { fetchCartItemsThunk } from '../../store/cartitems';
import { fetchSearchResultsThunk } from '../../store/product';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faSearch } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { faShop } from '@fortawesome/free-solid-svg-icons';

function Navigation({ isLoaded }){
	const dispatch = useDispatch();
	const sessionUser = useSelector(state => state.session.user);
	const location = useLocation();
	const history = useHistory();
	const [searchQuery, setSearchQuery] = useState('');

	// Fetch cart items when the component is mounted
	useEffect(() => {
		dispatch(fetchCartItemsThunk());
	}, [dispatch]);

	const userCart = useSelector(state => state.cartitems.currentCart);
	const totalItems = userCart.reduce((acc, item) => acc + item.quantity, 0);

	const handleSearchChange = (e) => {
		setSearchQuery(e.target.value);
	};

	// Dispatch and navigate to search results page
	const handleSearchSubmit = (e) => {
		e.preventDefault();
		dispatch(fetchSearchResultsThunk(searchQuery));
		history.push('/search');
	};


	return (
		<>
			<ul className="navbar">
				<li className="title-petsy">
					<NavLink exact to="/">
						Petsy
					</NavLink>
				</li>
				{isLoaded && (
					<>

						<li className="nav-center-item">
							<form onSubmit={handleSearchSubmit} className="search-container">
								<input
									className="search-input"
									placeholder="Search for anything"
									value={searchQuery}
									onChange={handleSearchChange}
								/>
								<button type="submit" className="search-icon-button">
									<FontAwesomeIcon icon={faSearch} className="search-icon" />
								</button>
							</form>
						</li>

						<li className="nav-item">

							{sessionUser && (
								<>
									<NavLink to={`/users/${sessionUser.id}/favorites`} className="favorites-button">
										<FontAwesomeIcon icon={regularHeart} style={{ color: '#000000' }} />
									</NavLink>

									<NavLink to="/listings" className="shop-button">
										<FontAwesomeIcon icon={faShop} style={{ color: '#000000' }} />
									</NavLink>
								</>
							)}

							<div className="profile-button-wrapper">
								<ProfileButton user={sessionUser} />
							</div>

							{sessionUser && (
								<NavLink to="/cart" className="cart-button">
									<FontAwesomeIcon icon={faShoppingCart} style={{ color: '#000000' }} />
									{totalItems > 0 && <span className="cart-count">{totalItems}</span>}
								</NavLink>
							)}

						</li>
					</>
				)}

			</ul>
			{location.pathname !== '/cart' && location.pathname !== '/add-listing' && location.pathname !== '/listings' && <CategoryNav />}

		</>
	);
}

export default Navigation;
