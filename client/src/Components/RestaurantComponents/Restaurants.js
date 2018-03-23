import React from 'react';
import { Link } from 'react-router-dom';

const Restaurants = props => {
  return (
    <div className="restaurant">
      <h1>{props.restaurants.names}</h1>
      <p>
        Rating: <small>{props.restaurants.rating}</small>
      </p>
      <p>
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
