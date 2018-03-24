import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter, Link } from 'react-router-dom';
import TokenService from '../Auth/Services/TokenService';
import Restaurants from './RestaurantComponents/Restaurants';
import Welcome from './Welcome';
import Header from './subComponents/Header';
import RestCreate from '../Components/RestaurantComponents/RestCreate';
import Footer from './subComponents/Footer';
import RestMap from '../Components/RestaurantComponents/RestMap';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      apiDataLoaded: false,
      apiData: null,
      show: false,
      showLocation: false,
      logoutUser: false,
      location: null,
      restaurants: [],
      next20: false,
      gotLocation: false,
      users: null,
      gotUsers: false,
    };
    this.buttonClick = this.buttonClick.bind(this);
    this.getLocation = this.getLocation.bind(this);
    this.logout = this.logout.bind(this);
    this.getRestaurants = this.getRestaurants.bind(this);
    this.mainListing = this.mainListing.bind(this);
    this.updateMain = this.updateMain.bind(this);
    this.getLocation = this.getLocation.bind(this);
    this.displayUsers = this.displayUsers.bind(this);
  }

  componentDidMount() {
    axios
      .get(`/api/restaurant`)
      .then(restaurants => {
        this.getLocation();
        console.log('Restaurants ->', restaurants);
        this.setState({
          apiDataLoaded: true,
          apiData: restaurants.data.data,
        });
        axios
          .get(`/api/user/all/${window.localStorage.getItem('username')}`)
          .then(foundUsers => {
            console.log('FOUND USERS--->', foundUsers.data.data);
            this.setState({
              users: foundUsers.data.data,
              gotUsers: true,
            });
          })
          .catch(err => {
            console.log('FAILED IN GETTING USERS--->', err);
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

  // getLocation() {
  //   if (navigator.geolocation) {
  //     console.log('getting users position');
  //     navigator.geolocation.getCurrentPosition(this.showPosition);
  //   } else {
  //     console.log('Geolocation is not supported by this browser.');
  //   }
  // }

  getLocation() {
    axios
      .request({
        method: 'get',
        url: 'http://ipinfo.io/json/?token=ca0bf2e0b0eeac',
      })
      .then(result => {
        console.log('geolocation', result);
        this.setState({
          location: 'restaurants near ' + result.data.postal,
          showLocation: true,
        });
      })
      .catch(err => {
        console.log('error in geolocation');
      });
  }

  buttonClick() {
    this.setState({
      show: !this.state.show,
    });
  }

  getRestaurants() {
    this.state.apiData.splice(0, 20).map((el, i) => {
      this.state.restaurants.push(el);
    });
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

  displayUsers() {
    if (this.state.users) {
      return this.state.users.map(el => {
        return (
          <Link to={`/user/page/${el.username}`}>
            <p>{el.username}</p>
          </Link>
        );
      });
    }
  }

  render() {
    console.log('current data', this.state.restaurants);
    console.log('current apiData', this.state.apiData);
    console.log('user loc', this.state.location);
    if (this.state.logoutUser) {
      return <Welcome />;
    } else {
      return (
        <div className="home">
          <div className="container-fluid">
            <Header />
            <div className="jumbotron">
              {this.state.showLocation ? (
                <RestMap location={this.state.location} />
              ) : (
                'no map'
              )}
              <small>Don't see a restaurant you want to review? ADD!</small>
              <br />
              <button onClick={this.buttonClick}>ADD</button>
              <button onClick={this.buttonClick}>Biz owner</button>
              {this.state.show ? <RestCreate /> : ''}
              {this.state.gotUsers ? this.displayUsers() : ''}
              {this.state.apiDataLoaded && !this.state.next20
                ? this.mainListing()
                : 'failed to load'}
              {this.state.next20 ? this.mainListing() : ''}
              <button onClick={this.updateMain}>See More</button>
            </div>
            <button onClick={this.logout}>Logout?</button>
            <Footer />
          </div>
        </div>
      );
    }
  }
}

export default Home;
