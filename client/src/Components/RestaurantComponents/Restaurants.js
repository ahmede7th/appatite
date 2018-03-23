import React from 'react';
import { Link } from 'react-router-dom';

const Restaurants = props => {
  const restaurant = props.restaurants;

  return (
    <div className="card" style={{width: "18rem"}}>
    <img className="card-img-top" src={props.restaurants.img_src} alt="Card image cap" />
      <div className="card-body">
        <h4 className="card-title">{props.restaurants.name}</h4>
        <p className="card-text"><i>Rating: </i>{props.restaurants.rating}</p>
        <p className="card-text"><b>{props.restaurants.cuisine}</b></p>
        <a href="#" className="btn btn-primary">go to restaurant</a>
      </div>
  </div>
  );
};

export default Restaurants;
