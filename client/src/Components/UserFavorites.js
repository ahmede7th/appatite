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
    this.numFavorites = this.numFavorites.bind(this);
  }

  componentDidMount() {
    const user = window.localStorage.getItem('id');
    console.log('INSIDE COMPONENT DID MOUNT USERFAVORITES--->', user);
    return axios
      .get(`/api/favorites/number/${user}`)
      .then(favorites => {
        console.log('USER FAVORITES ->', favorites);
        this.setState({
          apiDataLoaded: true,
          apiData: favorites.data.data,
        });
      })
      .catch(err => {
        console.log('nope :', err);
      });
  }

  numFavorites() {
    if (this.state.apiDataLoaded) {
      return this.state.apiData.map((el) => {
        return <div>el</div>;
      });
    }
  }

  render() {
    return (
        <div>
          <h1>USER FAVORITES!</h1>
          <p>{this.numFavorites()}</p>
        </div>
    );
  }
}

export default Home;
