import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter, Link } from 'react-router-dom';
import TokenService from '../Auth/Services/TokenService';

class AllFavorites extends Component {
  constructor() {
    super();
    this.state = {
      apiDataLoaded: false,
      apiData: null,
      fireRedirect: false,
    };
    this.goToFavorite = this.goToFavorite.bind(this);
  }

  goToFavorite() {
    return axios
      .post(
        `/api/favorites/user`,
        { withCredentials: true },
        {
          headers: {
            user: window.localStorage.getItem('id'),
          },
        },
      )
      .then(favorites => {
        console.console.log('GOT FAVORITES FOR USER --->', favorites);
      })
      .catch(err => {
        console.log('ERROR IN FAVORITES FOR USER--->', err);
      });
  }

  render() {
    return (
        <div>
          <h1>SINGLE RESTAURANTS</h1>
          <button onClick={this.goToFavorite}>Favorite This Baby!</button>
      </div>
    );
  }
}

export default AllFavorites;
