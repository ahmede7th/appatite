import React from 'react';
import ReactStars from 'react-stars';

const Restaurants = props => {
  const ratingChanged = newRating => {
    console.log(newRating);
  };

  return (<div className="restaurant">
    <h1>{props.restaurants.name}</h1>
    <ReactStars
      count={props.restaurants.rating}
      onChange={ratingChanged} size={20}
      edit={false}
      color1={'#ffd700'}
      position={'right'}/>
    <p>
      Cuisine:
      <strong>{props.restaurants.cuisine}</strong>
    </p>
    <img className="img-fluid img-thumbnail" width={"80%"} src={props.restaurants.img_src} alt="restaurant"/>
  </div>);
};

export default Restaurants;
