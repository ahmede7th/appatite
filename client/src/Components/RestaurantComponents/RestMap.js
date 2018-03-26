import React from 'react';

const RestMap = (props) => {
  return (<div className="map">
    <br/>
    <iframe title="map" className="embed-responsive" width={300} height={300} src={`https://www.google.com/maps/embed/v1/search?q=${props.location}&key=AIzaSyCgPb79qOvgUSyoGsPIhQSDnfNl5_DFasM`} allowFullScreen="allowFullScreen"></iframe>
  </div>)
}

export default RestMap;
