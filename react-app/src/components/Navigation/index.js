//react-app/src/components/Navigation/index.js

import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import CategoryNav from './CategoryNav.js';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faSearch } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { faShop } from '@fortawesome/free-solid-svg-icons';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);
	const location = useLocation();

	if (location.pathname === '/listings') {
		return null;
	}

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
							<div className="search-container">
							<input className="search-input" placeholder="Search for anything" />
							<FontAwesomeIcon icon={faSearch} className="search-icon" />
							</div>
						</li>

						<li className="nav-item">

							<NavLink to={`/users/${sessionUser?.id}/favorites`} className="favorites-button">
								<FontAwesomeIcon icon={regularHeart} style={{ color: '#000000' }} />
							</NavLink>

							<NavLink to="/listings" className="shop-button">
                                <FontAwesomeIcon icon={faShop} style={{ color: '#000000' }} />
                            </NavLink>

							<div className="profile-button-wrapper">
								<ProfileButton user={sessionUser} />
							</div>

							<NavLink to="/cart" className="cart-button">
								<FontAwesomeIcon icon={faShoppingCart} style={{ color: '#000000' }} />
							</NavLink>

						</li>
                	</>
				)}
			</ul>
			{location.pathname !== '/cart' && location.pathname !== '/add-listing' && <CategoryNav />}
		</>
	);
}

export default Navigation;
