//react-app/src/components/Navigation/index.js

import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import HeaderBubbles from '../HeaderBubbles/index';
import './Navigation.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

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
						<li className="nav-item">
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
			<HeaderBubbles />
		</>
	);
}

export default Navigation;
