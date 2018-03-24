import React, { Component } from 'react';
import axios from 'axios';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      apiDataLoaded: false,
      apiData: null,
    };
    this.restaurantUserFavorites = this.restaurantUserFavorites.bind(this);
  }

  componentDidMount() {
    console.log('inside component did mount restaurant user favorites', this.props.match.params.id);
    return axios
      .get(`/api/favorites/restaurant/users/${this.props.match.params.id}`)
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

  restaurantUserFavorites() {
    console.log(this.state.apiDataLoaded);
    if (this.state.apiDataLoaded) {
      return this.state.apiData.map((el, i) => {
        return <p>{el.username}</p>;
      });
    }
  }

  render() {
    return (
      <div className="welcome">
        <h1>RESTAURANT USER FAVORITES for {this.props.match.params.id}!</h1>
        {this.restaurantUserFavorites()}
      </div>
    );
  }
}

export default Home;
