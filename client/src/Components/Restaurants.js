import React from 'react';
import { Link } from 'react-router-dom';
import ReactStars from 'react-stars'

const Restaurants = (props) => {
		 const names = (props.restaurants.name).replace(/ /g, "%20")

		 const ratingChanged = (newRating) => {
		   console.log(newRating)
		 }

	return (
		<div class="restaurant">
			<h1>{props.restaurants.names}</h1>
			<p><ReactStars count={5} onChange={ratingChanged} size={24} color2={'#ffd700'} /></p>
			<p>Cuisine: <strong>{props.restaurants.cuisine}</strong></p>
			<img src={props.restaurants.img_src} alt="restaurant"></img>
			<p><Link to={`/main/${names}`}>Click for more details</Link></p>
		</div>
	)
}

export default Restaurants;
