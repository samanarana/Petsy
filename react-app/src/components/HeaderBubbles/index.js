import React from 'react';
import { NavLink } from 'react-router-dom';
import './HeaderBubbles.css';

const categories = ['Health & Wellness', 'Bedding & Furniture', 'Travel & Outdoor', 'Collars & Accessories', 'Food & Treats', 'Toys'];

function HeaderBubbles(){
	return (
		<div className="header">
            <div className="header-content">
			    <div className="header-title">
			        <h1>Paw-picked finds for you!</h1>
			    </div>
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
		</div>
	);
}

export default HeaderBubbles;
