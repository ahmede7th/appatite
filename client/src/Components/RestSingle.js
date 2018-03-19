import React, { Component } from 'react';
import axios from 'axios';

class RestSingle extends Component {
	constructor() {
		super();
		this.state = {
			apiDataLoaded: false,
			apiData: null
		}
	};

	componentDidMount() {
		return axios.get(`/api/restaurant/${this.props.match.params.id}`)
			.then(restaurant => {
				console.log('single ->', restaurant)
				this.setState({
					apiDataLoaded: true,
					apiData: restaurant.data.data[0]
				})
			})
			.catch(err => {
				console.log(err)
			})
	};

	render() {
		return (	
			<div className="restaurant-single">
				<h1>single</h1>
				<h2>{this.state.apiDataLoaded ? this.state.apiData.name : 'failed to load'}</h2>
			</div>
		)
	}
}

export default RestSingle