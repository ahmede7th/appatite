import React, {Component} from 'react';

const RestMap = (props) => {
  return (<div className="map">
    <br/>
    <iframe className="embed-responsive" width={300} height={300} src={`https://www.google.com/maps/embed/v1/search?q=${props.location}&key=AIzaSyCgPb79qOvgUSyoGsPIhQSDnfNl5_DFasM`} allowfullscreen="allowfullscreen"></iframe>
  </div>)
}

export default RestMap;
