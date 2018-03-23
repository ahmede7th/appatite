import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter, Link } from 'react-router-dom';
import TokenService from '../../Auth/Services/TokenService';
import Header from '../subComponents/Header';
import Welcome from '../Welcome';

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
    };
    this.getLocation = this.getLocation.bind(this);
    this.showPosition = this.showPosition.bind(this);
    this.logout = this.logout.bind(this);
    this.follow = this.follow.bind(this);
  }

  componentDidMount() {
    axios
      .get(`/api/follower/${this.props.match.params.id}`)
      .then(followers => {
        console.log('GETTING FOLLOWERS IN REACT WORKED ->', followers.data);
        this.setState({
          apiDataLoaded: true,
          apiData: followers.data.data,
        });
      })
      .catch(err => {
        console.log('GETTING FOLLOWERS IN REACT FAILED--->', err);
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

  follow() {
    return axios
      .post(
        `/api/follower/add/${this.props.match.params.id}`,
        { withCredentials: true },
        {
          headers: {
            user: window.localStorage.getItem('username'),
          },
        },
      )
      .then(followers => {
        console.console.log('GOT FOLLOWERS SINGLE PAGE--->', followers);
        this.setState({
          followers: true,
        });
      })
      .catch(err => {
        console.log('ERROR IN FOLLOWERS SINGLE PAGE--->', err);
      });
  }

  render() {
    if (this.state.logoutUser) {
      return <Welcome />;
    } else {
      return (
        <div className="container-fluid">
          <Header />
          <div className="jumbotron">
            {this.state.apiDataLoaded ? <p>Got followers!</p> : ''}
          </div>
          <button onClick={this.follow}>Follow?</button>
          <button onClick={this.logout}>Logout?</button>
          {/* <Footer /> */}
        </div>
      );
    }
  }
}

export default Home;
