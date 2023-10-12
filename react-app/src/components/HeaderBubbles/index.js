import React from 'react';
import { NavLink } from 'react-router-dom';
import './headerbubbles.css';

const categories = ['Health & Wellness', 'Bedding & Furniture', 'Travel & Outdoor', 'Collars & Accessories', 'Food & Treats', 'Toys'];

function HeaderBubbles(){
	return (
		<div className="header">
			<ul className="bubble-nav">
				{categories.map((category) => (
					<li key={category} className="bubble-item">
						<NavLink to={`/${category.toLowerCase()}`} activeClassName="active">
							<div className="bubble"></div>
							<span>{category}</span>
						</NavLink>
					</li>
				))}
			</ul>
		</div>
	);
}

export default HeaderBubbles;
