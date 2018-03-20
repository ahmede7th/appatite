import React, { Component } from 'react';
import axios from 'axios';

import Restaurants from './Restaurants';
import Header from './subComponents/Header';
import Footer from './subComponents/Footer';
<<<<<<< HEAD

class Home extends Component {
  constructor() {
    super();
    this.state = {
      apiDataLoaded: false,
      apiData: null,
    };
  }
=======
import RestCreate from '../Components/RestCreate';

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
>>>>>>> a17e36c0f62943f34f28118ba8d611a700bf9027

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

<<<<<<< HEAD
  mainListing() {
    if (this.state.apiDataLoaded) {
      return this.state.apiData.map((el, i) => {
        return <Restaurants restaurants={el} key={el.id} />;
      });
    }
  }

  render() {
    return (
      <div className="main">
        <Header />
        {this.state.apiDataLoaded ? this.mainListing() : 'failed to load'}
        <Footer />
      </div>
    );
  }
}
=======
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
			<div className="container-fluid">
				<Header />
					<div className="jumbotron">
					<button onClick={this.buttonClick}>Biz owner</button>
					{this.state.show ? <RestCreate /> : ''}
					{this.state.apiDataLoaded ? this.mainListing() : 'failed to load'}
					</div>
				<Footer />
			</div>
		)
	}
};
>>>>>>> a17e36c0f62943f34f28118ba8d611a700bf9027

export default Home;
