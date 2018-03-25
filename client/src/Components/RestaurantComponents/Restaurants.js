import React from 'react';
import { Link } from 'react-router-dom';
import ReactStars from 'react-stars';

const Restaurants = props => {
  const ratingChanged = newRating => {
    console.log(newRating);
  };

  return (
    <div className="restaurant">
      <h1>{props.restaurants.name}</h1>
      <p>
        Rating:
        <small>{props.restaurants.rating}</small>
        <ReactStars
          count={props.restaurants.rating}
          onChange={ratingChanged}
          size={20}
          edit={false}
          color1={'#ffd700'}
          position={'right'}
        />
      </p>
      <p>
        Cuisine:
        <strong>{props.restaurants.cuisine}</strong>
      </p>
      <img
        className="img-fluid"
        src={props.restaurants.img_src}
        alt="restaurant"
      />
    </div>
  );
};

export default Restaurants;
