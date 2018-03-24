import React from 'react';
import {Link} from 'react-router-dom';
import ReactStars from 'react-stars'

const Restaurants = props => {
  const ratingChanged = (newRating) => {
    console.log(newRating)
  };

  return (<div className="restaurant">
    <h1>{props.restaurants.name}</h1>
    <p>
      Rating:
      <small>{props.restaurants.rating}</small>
      <div style={{position:'center'}}><ReactStars count={props.restaurants.rating} onChange={ratingChanged} size={20} edit={false} color1={'#ffd700'} position={'center'}/></div>
    </p>
    <p>
      Cuisine:
      <strong>{props.restaurants.cuisine}</strong>
    </p>
    <img src={props.restaurants.img_src} alt="restaurant"/>
    <p>
      <Link to={`/main/${props.restaurants.id}`}>Click for more details</Link>
    </p>
  </div>);
};

export default Restaurants;
