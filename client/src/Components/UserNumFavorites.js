import React, { Component } from 'react';
import axios from 'axios';

class AllFavorites extends Component {
  constructor() {
    super();
    this.state = {
      apiDataLoaded: false,
      apiData: null,
      fireRedirect: false,
    };
    this.userNumFavorites = this.userNumFavorites.bind(this);
  }

  componentDidMount() {
    const user = window.localStorage.getItem('id');
    console.log('INSIDE COMPONENT DID MOUNT USER NUM FAVORITES--->', user);
    return axios
      .get(`/api/favorites/user/num/${user}`)
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

  userNumFavorites() {
    if (this.state.apiDataLoaded) {
      return <p>{this.state.apiData[0].count}</p>;
    }
  }

  render() {
    return (
      <div>
        <h1>NUMBER OF USER FAVORITES!</h1>
        {this.userNumFavorites()}
      </div>
    );
  }
}

export default AllFavorites;
