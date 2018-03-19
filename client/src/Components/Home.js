import React, { Component } from 'react';
import axios from 'axios';

import Restaurants from './Restaurants'
import Header from './subComponents/Header';
import Footer from './subComponents/Footer';


class Home extends Component {
	constructor() {
		super();
		this.state = {
			apiDataLoaded: false,
			apiData: null
		}
	};

	componentDidMount() {
		return axios.get(`/api/restaurant`)
			.then(restaurants => {
				console.log('Restaurants ->', restaurants)
				this.setState({
					apiDataLoaded: true,
					apiData: restaurants.data.data
				})
			})
			.catch(err => {
				console.log('nope :', err)
			})
	};

	mainListing() {
		if (this.state.apiDataLoaded) {
			return this.state.apiData.map((el, i) => {
				return <Restaurants restaurants={el} key={el.id} />
			})
		}
	};

	render() {
		return (
			<div className="main">
				<Header />
					{this.state.apiDataLoaded ? this.mainListing() : 'failed to load'}
				<Footer />
			</div>
		)
	}
};

export default Home