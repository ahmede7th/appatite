import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter, Link } from 'react-router-dom';
import TokenService from '../Auth/Services/TokenService';

import Restaurants from './Restaurants';
import Welcome from './Welcome';
import Header from './subComponents/Header';
import RestCreate from '../Components/RestCreate';
import Yelp from './yelpComponents/Yelp';

class Home extends Component {
	constructor() {
		super();
		this.state = {
			apiDataLoaded: false,
			apiData: null,
			yelpDataLoaded:false,
			apiYelp:null,
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
//calls database for our restaurants
		axios
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
			}),

//calls yelps api for restaurant
			 axios
       .get(`http://localhost:3001/api/yelp`)
       .then(restaurants => {
				 console.log('apiYelp----->',restaurants.data.data)
         this.setState({
					 yelpDataLoaded:true,
           apiYelp: restaurants.data.data.businesses,
         });
				 	console.log(this.state.apiYelp)
			 })
       .catch(err => {
         console.log('nope :', err);
        })
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

//el.name key el.id

  mainListing() {
    if (this.state.apiDataLoaded) {
      return this.state.apiData.map((el, i) => {
        return <Restaurants restaurants={el} key={el.id} />;
      });
    }
		//this.yelpListing()
  };

	yelpListing(){
		if (this.state.yelpDataLoaded) {
			return this.state.apiYelp.map((el, i) => {
				 //console.log('YELP API EL.NAME',el.name)
				 return <Yelp yelp={el} key={el.id} />;
	})
}
};



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
							<h1>------------_YELP_----------------------------</h1>
							{this.state.yelpDataLoaded? this.yelpListing():'failed to load'}
            </div>
            <button onClick={this.logout}>Logout?</button>
            {/* <Footer /> */}
          </div>
      );
    }
  }
}

export default Home;
