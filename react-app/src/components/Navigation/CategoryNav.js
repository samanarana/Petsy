import React from 'react';
import { NavLink } from 'react-router-dom';
import './CategoryNav.css';
import { convertToBackendCategory } from '../../store/product';

const categories = [ 'All Products', 'The Holiday Shop', 'Home & Living', 'Travel & Outdoor', 'Collars & Accessories', 'Food & Treats'];

function CategoryNav() {
    return (
        <ul className="category-nav">
            {categories.map((category) => (
                <li key={category} className="category-item">
                    <NavLink
                        to={category === 'All Products' ? '/products' : `/category/${convertToBackendCategory(category)}`}
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
