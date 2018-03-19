import React from 'react';
import { Link } from 'react-router-dom';

const Restaurants = (props) => {
	const name = (props.restaurants.name).replace(/ /g, "%20")

	return (
		<div className="restaurant">
			<h1>{props.restaurants.name}</h1>
			<p>Rating: <small>{props.restaurants.rating}</small></p>
			<p>Cuisine: <strong>{props.restaurants.cuisine}</strong></p>
			<Link to={`/main/${name}`}>Click for more details</Link>
		</div>
	)
}

export default Restaurants;