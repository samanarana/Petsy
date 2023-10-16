import React from 'react';
import { NavLink } from 'react-router-dom';
import './CategoryNav.css';

const categories = ['Health & Wellness', 'Bedding & Furniture', 'Travel & Outdoor', 'Collars & Accessories', 'Food & Treats', 'Toys'];

function CategoryNav() {
	return (
		<ul className="category-nav">
			{categories.map((category) => (
				<li key={category} className="category-item">
					<NavLink to={`/${category.toLowerCase()}`} activeClassName="active-category">
						<span>{category}</span>
					</NavLink>
				</li>
			))}
		</ul>
	);
}

export default CategoryNav;
