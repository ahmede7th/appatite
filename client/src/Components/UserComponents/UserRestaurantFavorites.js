import React, { Component } from 'react';
import axios from 'axios';
import Header from '../subComponents/Header'

class Home extends Component {
  constructor() {
    super();
    this.state = {
      apiDataLoaded: false,
      apiData: null,
    };

    this.userRestaurantFavorites = this.userRestaurantFavorites.bind(this);
  }

  componentDidMount() {
    const user = window.localStorage.getItem('id');
    console.log('INSIDE COMPONENT DID MOUNT USERFAVORITES--->', user);
    return axios
      .get(`/api/favorites/user/restaurants/${user}`)
      .then(favorites => {
        console.log('USER FAVORITES ->', favorites.data.data);
        this.setState({
          apiDataLoaded: true,
          apiData: favorites.data.data,
        });
      })
      .catch(err => {
        console.log('nope :', err);
      });
  }

  userRestaurantFavorites() {
    if (this.state.apiDataLoaded) {
      return this.state.apiData.map((el, i) => {
        return <p>{el.restaurant_name}</p>;
      });
    }
  }

  render() {
    return (
      <div>
      <Header />
        <h1>USER FAVORITES!</h1>
        {this.userRestaurantFavorites()}
      </div>
    );
  }
}

export default Home;
