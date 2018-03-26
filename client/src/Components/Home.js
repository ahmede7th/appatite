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
import RestSingle from '../Components/RestaurantComponents/RestSingle';
import {Button} from 'reactstrap';

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
      count: 0,
      map: true,
      reviews: false,
      restaurant: null,
      update: false,
    };
    this.buttonClick = this.buttonClick.bind(this);
    this.getLocation = this.getLocation.bind(this);
    this.logout = this.logout.bind(this);
    this.getRestaurants = this.getRestaurants.bind(this);
    this.mainListing = this.mainListing.bind(this);
    this.updateMain = this.updateMain.bind(this);
    this.getLocation = this.getLocation.bind(this);
    this.displayUsers = this.displayUsers.bind(this);
    this.renderMap = this.renderMap.bind(this);
    this.renderRestaurant = this.renderRestaurant.bind(this);
    this.showOne = this.showOne.bind(this);
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

  componentWillReceiveProps() {
    console.log('I AM IN PROPS--->', this.props);
  }

  logout(ev) {
    ev.preventDefault();
    TokenService.destroy();
    this.setState({
      logoutUser: true,
    });
  }

  getLocation() {
    axios
      .request({
        method: 'get',
        url: 'http://ipinfo.io/json/?token=ca0bf2e0b0eeac',
      })
      .then(result => {
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
      show: !this.state.show
    });
  }

  getRestaurants(startIndex) {
    this.state.apiData.splice(startIndex, 5).map((el, i) => {
      this.state.restaurants.push(el);
    });
  }

  mainListing(index) {
    this.getRestaurants(index);
    if (this.state.restaurants) {
      return this.state.restaurants.map((el, i) => {
        return (
          <div className="border-top border-primary" key={i}>
            <br/>
            <Restaurants restaurants={el} key={el.id} />
            <Button color='primary' onClick={this.showOne} value={el.id}>
              Click for more details
            </Button>
          </div>
        );
      });
    }
  }

  showOne(e) {
    console.log('working...', e.target.value);
    this.setState({
      restaurant: e.target.value,
      map: false,
    });
  }

  renderRestaurant() {
    console.log('really working...', this.state.restaurant);
    return (
      <RestSingle
        id={this.state.restaurant}
      />
    );
  }

  updateMain() {
    const newCount = this.state.count;
    this.setState({
      next20: !this.state.next20,
      count: newCount + 1,
    });
  }

  displayUsers() {
    if (this.state.users) {
      return this.state.users.map(el => {
        return (
          <Link key={el.id} to={`/user/page/${el.username}`}>
            <p>{el.username}</p>
          </Link>
        );
      });
    }
  }

  renderMap() {
    if (this.state.showLocation) {
      return (
        <div>
          <p className="text-center">Restaurants near you</p>
          <RestMap location={this.state.location} />
        </div>
      );
    }
  }

  renderReviews() {}

  render() {
    console.log('state restaurant', this.state.restaurant)
    if (this.state.logoutUser) {
      return <Welcome />;
    } else {
      return (
        <div className="home">
          <Header logout={this.logout} />
          <div className="jumbotron">
            <small>Don't see a restaurant you want to review? ADD!</small>
            <br />
            <Button color='primary' onClick={this.buttonClick}>ADD</Button>

            {this.state.show ? <RestCreate /> : ''}
            {this.state.gotUsers ? this.displayUsers() : ''}

            <div className="row">
              <div className="col-sm" id="left">
                {this.state.apiDataLoaded && !this.state.next20
                  ? this.mainListing()
                  : ''}
                {this.state.next20
                  ? this.mainListing(`${this.state.count}`)
                  : ''}
              </div>

                <div className="col-sm" id="right">
                  {this.state.map ? this.renderMap() : ''}
                  {/*{this.state.reviews ? this.renderReviews() : ''}*/}
                  {this.state.restaurant ? this.renderRestaurant() : ''}
                </div>
            </div>
            <Button color='primary' onClick={this.updateMain} id="seemore">See More</Button>
          </div>
          <Footer />
        </div>
      );
    }
  }
}

export default Home;
