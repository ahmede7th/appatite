import React, { Component } from 'react';
import axios from 'axios';
import Restaurants from './Restaurants';
import Header from './subComponents/Header';
import Footer from './subComponents/Footer';
import RestCreate from '../Components/RestCreate';
import auth from '../Auth/Auth';
import { BrowserRouter, Link } from 'react-router-dom';

class Home extends Component {
	constructor() {
		super();
		this.state = {
			apiDataLoaded: false,
			apiData: null,
			show: false
		}
		this.buttonClick = this.buttonClick.bind(this)
	};

  componentDidMount() {
    return axios
      .get(`/api/restaurant`)
      .then(restaurants => {
        console.log('Restaurants ->', restaurants);
        this.setState({
          apiDataLoaded: true,
          apiData: restaurants.data.data,
        });
      })
      .catch(err => {
        console.log('nope :', err);
      });
  }

	buttonClick() {
		this.setState({
			show: !this.state.show
		})
	}

	mainListing() {
		if (this.state.apiDataLoaded) {
			return this.state.apiData.map((el, i) => {
				return <Restaurants restaurants={el} key={el.id} />
			})
		}
	};

	render() {
		return (
    <BrowserRouter>
			<div className="container-fluid">
				<Header />
					<div className="jumbotron">
					<button onClick={this.buttonClick}>Biz owner</button>
					{this.state.show ? <RestCreate /> : ''}
					{this.state.apiDataLoaded ? this.mainListing() : 'failed to load'}
					</div>
				<Footer />
			</div>
		</BrowserRouter>
		)
	}
};

export default Home;
