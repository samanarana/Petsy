import React from 'react';
import { NavLink } from 'react-router-dom';
import './HeaderBubbles.css';

const categories = [
	{
	  name: 'Health & Wellness',
	  image: 'https://res.cloudinary.com/ddlkhhzk0/image/upload/v1697472464/5316229_ocyoqj.jpg'
	},
	{
	  name: 'Bedding & Furniture',
	  image: 'https://res.cloudinary.com/ddlkhhzk0/image/upload/v1697472548/Untitled_Artwork13_hwxa21.jpg'
	},
	{
	  name: 'Travel & Outdoor',
	  image: 'https://res.cloudinary.com/ddlkhhzk0/image/upload/v1697472586/pet-travel-accessories-cat_ejj0t4.jpg'
	},
	{
	  name: 'Collars & Accessories',
	  image: 'https://res.cloudinary.com/ddlkhhzk0/image/upload/v1697472710/in1fjoierqd61_abbn0i.jpg'
	},
	{
	  name: 'Food & Treats',
	  image: 'https://res.cloudinary.com/ddlkhhzk0/image/upload/v1697472792/protein-foods-1000-1497982661_yymuk4.jpg'
	},
	{
	  name: 'Toys',
	  image: 'https://res.cloudinary.com/ddlkhhzk0/image/upload/v1697472798/dog-toys-2048px-0010_k2gsmf.jpg'
	}
  ];

function HeaderBubbles(){
	return (
		<div className="header">
            <div className="header-content">
			    <div className="header-title">
			        <h1>Paw-picked finds for you!</h1>
			    </div>
			    <ul className="bubble-nav">
				    {categories.map((category) => (
					    <li key={category.name} className="bubble-item">
						    <NavLink to={`/${category.name.toLowerCase()}`} activeClassName="active">
							    <div className="bubble" style={{ backgroundImage: `url(${category.image})` }}></div>
							    <span>{category.name}</span>
						    </NavLink>
					    </li>
				    ))}
			    </ul>
            </div>
		</div>
	);
}

export default HeaderBubbles;
