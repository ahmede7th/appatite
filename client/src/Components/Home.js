import React, { Component } from 'react';
import axios from 'axios';
import Restaurants from './Restaurants';
import Welcome from './Welcome';
import Header from './subComponents/Header';
import Footer from './subComponents/Footer';
import RestCreate from '../Components/RestCreate';
import { BrowserRouter, Link } from 'react-router-dom';
import TokenService from '../Auth/Services/TokenService';

class Home extends Component {
	constructor() {
		super();
		this.state = {
			apiDataLoaded: false,
			apiData: null,
			show: false,
			logoutUser: false,
			lat: null,
			long: null
		}
		this.buttonClick = this.buttonClick.bind(this)
		this.getLocation = this.getLocation.bind(this)
		this.showPosition = this.showPosition.bind(this)
		this.logout = this.logout.bind(this)
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

  logout(ev) {
    ev.preventDefault();
    TokenService.destroy();
    this.setState({
      logoutUser: true,
    });
  }

	getLocation() {
	    if (navigator.geolocation) {
	    	console.log('getting users position')
	        navigator.geolocation.getCurrentPosition(this.showPosition);
	    } else { 
	        console.log("Geolocation is not supported by this browser.");
	   	  }
	}

	showPosition(position) {
		console.log('users location has been set', position)
	    this.setState({
	     	lat: position.coords.latitude,
	     	long: position.coords.longitude
	     }) 
	}

  buttonClick() {
    this.setState({
      show: !this.state.show,
    });
  }

  mainListing() {
    if (this.state.apiDataLoaded) {
      return this.state.apiData.map((el, i) => {
        return <Restaurants restaurants={el} key={el.id} />;
      });
    }
  }
  
  render() {
    if (this.state.logoutUser) {
      return <Welcome />;
    } else {
      return (
          <div className="container-fluid">
            <Header />
            <div className="jumbotron">
              <button onClick={this.buttonClick}>Biz owner</button>
              {this.state.show ? <RestCreate /> : ''}
              {this.state.apiDataLoaded ? this.mainListing() : 'failed to load'}
            </div>
            <button onClick={this.logout}>Logout?</button>
            {/* <Footer /> */}
          </div>
      );
    }
  }
}

export default Home;
