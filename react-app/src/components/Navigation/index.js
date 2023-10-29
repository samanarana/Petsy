//react-app/src/components/Navigation/index.js

import React, { useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import CategoryNav from './CategoryNav.js';
import { fetchCartItemsThunk } from '../../store/cartitems';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faSearch } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { faShop } from '@fortawesome/free-solid-svg-icons';

function Navigation({ isLoaded }){
	const dispatch = useDispatch();
	const sessionUser = useSelector(state => state.session.user);
	const location = useLocation();

	// Fetch cart items when the component is mounted
	useEffect(() => {
		dispatch(fetchCartItemsThunk());
	}, [dispatch]);

	const userCart = useSelector(state => state.cartitems.currentCart);
	const totalItems = userCart.reduce((acc, item) => acc + item.quantity, 0);

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

                            {sessionUser && (
                                <NavLink to="/listings" className="shop-button">
                                    <FontAwesomeIcon icon={faShop} style={{ color: '#000000' }} />
                                </NavLink>
                            )}

							<div className="profile-button-wrapper">
								<ProfileButton user={sessionUser} />
							</div>

							<NavLink to="/cart" className="cart-button">
								<FontAwesomeIcon icon={faShoppingCart} style={{ color: '#000000' }} />
								{totalItems > 0 && <span className="cart-count">{totalItems}</span>}
							</NavLink>

						</li>
                	</>
				)}
			</ul>
			{location.pathname !== '/cart' && location.pathname !== '/add-listing' && location.pathname !== '/listings' && <CategoryNav />}
		</>
	);
}

export default Navigation;
