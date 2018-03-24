import React, { Component } from 'react';

const RestMap = (props) => {
	return (
		<div>
			<iframe src={`https://www.google.com/maps/embed/v1/search?q=${props.location}&key=AIzaSyCgPb79qOvgUSyoGsPIhQSDnfNl5_DFasM`} allowfullscreen></iframe>
		</div>
	)
}

export default RestMap;