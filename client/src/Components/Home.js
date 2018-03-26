import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import TokenService from '../Auth/Services/TokenService';
import Restaurants from './RestaurantComponents/Restaurants';
import Welcome from './Welcome';
import Header from './subComponents/Header';
import RestCreate from '../Components/RestaurantComponents/RestCreate';
import Footer from './subComponents/Footer';
import RestMap from '../Components/RestaurantComponents/RestMap';
import RestSingle from '../Components/RestaurantComponents/RestSingle';
import {Collapse, Button, Card} from 'reactstrap';

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
      next20: true,
      gotLocation: false,
      users: null,
      gotUsers: false,
      count: 0,
      map: true,
      reviews: false,
      restaurant: null,
      update: false,
      showUsers: false
    };
    this.buttonClick = this.buttonClick.bind(this);
    this.getLocation = this.getLocation.bind(this);
    this.logout = this.logout.bind(this);
    this.getRestaurants = this.getRestaurants.bind(this);
    this.mainListing = this.mainListing.bind(this);
    // this.updateMain = this.updateMain.bind(this);
    this.getLocation = this.getLocation.bind(this);
    this.displayUsers = this.displayUsers.bind(this);
    this.renderMap = this.renderMap.bind(this);
    this.renderRestaurant = this.renderRestaurant.bind(this);
    this.showOne = this.showOne.bind(this);
    this.toggle = this.toggle.bind(this);
    this.updateNext20 = this.updateNext20.bind(this);
  }

  componentDidMount() {
    axios
      .get(`/api/restaurant`)
      .then(restaurants => {
        this.getLocation();
        this.setState({
          apiDataLoaded: true,
          apiData: restaurants.data.data,
        });
        axios
          .get(`/api/user/all/${window.localStorage.getItem('username')}`)
          .then(foundUsers => {
            this.setState({
              users: foundUsers.data.data,
              gotUsers: true,
            });
          }).catch(err => {
            console.log('FAILED IN GETTING USERS--->', err);
          });
      }).catch(err => {
        console.log('nope :', err);
      });
  }

  logout(ev) {
    ev.preventDefault();
    TokenService.destroy();
    this.setState({logoutUser: true});
  }

  getLocation() {
    axios.request({method: 'get', url: 'http://ipinfo.io/json/?token=ca0bf2e0b0eeac'}).then(result => {
      console.log(result);
      this.setState({
        location: 'restaurants near ' + result.data.postal,
        showLocation: true
      });
    }).catch(err => {
      console.log('error in geolocation');
    });
  }

  buttonClick() {
    this.setState({
      show: !this.state.show
    });
  }

  getRestaurants(startIndex) {
    if (this.state.next20) {
      this.state.apiData.splice(startIndex, 5).map((el, i) => {
        this.state.restaurants.push(el);
      });
    }
  }

  mainListing(index) {
    this.getRestaurants(index);
    if (this.state.restaurants) {
      return this.state.restaurants.map((el, i) => {
        return (<div className="border-top border-primary" key={i}>
          <br/>
          <Restaurants restaurants={el} key={el.id}/>
          <Button color='primary' onClick={this.showOne} value={el.id}>
            Click for more details
          </Button>
        </div>);
      });
    }
  }

  showOne(e) {
    this.setState({restaurant: e.target.value, map: false});
  }

  renderRestaurant() {
    return (<RestSingle id={this.state.restaurant}/>);
  }

  // updateMain() {
  //   this.setState({
  //     next20: !this.state.next20,
  //   });
  // }

  updateNext20() {
    let iter;
    const newCount = this.state.count;
    console.log('NEXT 20 IN UPDATE MAIN--->', this.state.next20);

    this.setState({
      count: newCount + 1,
    })
  }

  displayUsers() {
    if (this.state.users) {
      return this.state.users.map(el => {
        return (<Link key={el.id} to={`/user/page/${el.username}`}>
          <p>{el.username}</p>
        </Link>);
      });
    }
  }

  renderMap() {
    if (this.state.showLocation) {
      return (<div>
        <p className="text-center">Restaurants near you</p>
        <RestMap location={this.state.location}/>
      </div>);
    }
  }

  toggle() {
    if (this.state.gotUsers) {
      this.setState({
        showUsers: !this.state.showUsers
      })
    }
  }
  // renderReviews() {}

  render() {
    if (this.state.logoutUser) {
      return <Welcome/>;
    } else {
      return (
        <div className='home' style={{
            background: 'white'
          }}>
          <Header logout={this.logout}/>
          <div className="jumbotron">
            <small>Don't see a restaurant you want to review? ADD!</small>
            <br/>
            <div>
              <Button color="primary" onClick={this.buttonClick} style={{
                  marginBottom: '1rem'
                }}>ADD</Button>
              <Collapse isOpen={this.state.show}>
                <Card>
                  <RestCreate/>
                </Card>
              </Collapse>
            </div>
            <div>
              <Button color="primary" onClick={this.toggle} style={{
                  marginBottom: '1rem'
                }}>Users</Button>
              <Collapse isOpen={this.state.showUsers}>
                <Card>
                  {this.displayUsers()}
                </Card>
              </Collapse>
            </div>

          <div className="row">
            <div className="col-sm" id="left">
              {
                this.state.apiDataLoaded
                  ? this.mainListing(this.state.count)
                  : ''}
              </div>
                <div className="col-sm" id="right">
                  {this.state.map ? this.renderMap() : ''}
                  {/*{this.state.reviews ? this.renderReviews() : ''}*/}
                  {this.state.restaurant ? this.renderRestaurant() : ''}
                </div>
            </div>
            <Button color='primary' onClick={this.updateNext20} id="seemore">See More</Button>
          </div>
          <Footer/>
        </div>

);
    }
  }
}

export default Home;
