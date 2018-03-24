import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter, Link } from 'react-router-dom';
import TokenService from '../Auth/Services/TokenService';
import Restaurants from './RestaurantComponents/Restaurants';
import Welcome from './Welcome';
import Header from './subComponents/Header';
import RestCreate from '../Components/RestaurantComponents/RestCreate';
import Footer from './subComponents/Footer';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      apiDataLoaded: false,
      apiData: null,
      show: false,
      logoutUser: false,
      lat: null,
      long: null,
      restaurants: [],
      next20: false,
    };
    this.buttonClick = this.buttonClick.bind(this);
    this.getLocation = this.getLocation.bind(this);
    this.showPosition = this.showPosition.bind(this);
    this.logout = this.logout.bind(this);
    this.getRestaurants = this.getRestaurants.bind(this);
    this.mainListing = this.mainListing.bind(this);
    this.updateMain = this.updateMain.bind(this);
  }

  componentDidMount() {
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
      console.log('getting users position');
      navigator.geolocation.getCurrentPosition(this.showPosition);
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  }

  showPosition(position) {
    console.log('users location has been set', position);
    this.setState({
      lat: position.coords.latitude,
      long: position.coords.longitude,
    });
  }

  buttonClick() {
    this.setState({
      show: !this.state.show,
    });
  }

  getRestaurants() {
    console.log(this.state.apiData);
    this.state.apiData.splice(0, 20).map((el, i) => {
      this.state.restaurants.push(el);
    });
  }

  mainListing() {
    this.getRestaurants();
    if (this.state.restaurants) {
      return this.state.restaurants.map((el, i) => {
        return <Restaurants restaurants={el} key={el.id} />;
      });
    }
  }

  updateMain() {
    this.setState({
      next20: true,
    });
  }

  render() {
    console.log('current data', this.state.restaurants);
    console.log('current apiData', this.state.apiData);
    // this.getLocation()
    if (this.state.logoutUser) {
      return <Welcome />;
    } else {
      return (
        <div className="container-fluid">
          <Header />
          <div className="jumbotron">
            <small>Don't see a restaurant you want to review? ADD!</small>
            <br />
            <button onClick={this.buttonClick}>ADD</button>
            {this.state.show ? <RestCreate /> : ''}
            {this.state.apiDataLoaded ? this.mainListing() : 'failed to load'}
            {this.state.next20 ? this.mainListing(): 'failed to load'}
            <button onClick={this.updateMain}>See More</button>
            <button onClick={this.logout}>Logout?</button>
            <Footer />
          </div>
        </div>
      );
    }
  }
}

export default Home;
