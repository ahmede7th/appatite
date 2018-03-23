import React from 'react';
import { Link } from 'react-router-dom';
import ReactStars from 'react-stars';

const Restaurants = props => {
  const ratingChanged = (newRating) => {
    console.log(newRating)
  };

  return (
    <div className="restaurant">
      <h1>{props.restaurants.name}</h1>
      <p>
        Rating: <small>{props.restaurants.rating}</small>
      <p><ReactStars count={5} onChange={ratingChanged} size={24} color2={'#ffd700'} /></p>
        Cuisine: <strong>{props.restaurants.cuisine}</strong>
      </p>
      <img src={props.restaurants.img_src} alt="restaurant" />
      <p>
        <Link to={`/main/${props.restaurants.id}`}>Click for more details</Link>
      </p>
    </div>
  );
};

export default Restaurants;
