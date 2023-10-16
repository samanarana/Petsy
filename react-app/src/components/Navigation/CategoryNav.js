import React from 'react';
import { NavLink } from 'react-router-dom';
import './CategoryNav.css';

const categories = [ 'All Products', 'The Holiday Shop', 'Home & Living', 'Travel & Outdoor', 'Collars & Accessories', 'Food & Treats'];

function CategoryNav() {
	return (
		<ul className="category-nav">
			{categories.map((category) => (
				<li key={category} className="category-item">
					<NavLink to={category === 'All Products' ? '/all-products' : `/${category.toLowerCase()}`}
						activeClassName="active-category"
					>
						<span>{category}</span>
					</NavLink>
				</li>
			))}
		</ul>
	);
}

export default CategoryNav;
