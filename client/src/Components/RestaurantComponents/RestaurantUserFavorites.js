import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      apiDataLoaded: false,
      apiData: null,
      user: null
    };
    this.userRestaurantFavorites = this.userRestaurantFavorites.bind(this);
    this.renderUser = this.renderUser.bind(this);
  }

  componentDidMount() {
    return axios.get(`/favorites/user/restaurants/${this.props.user}`).then(favorites => {
      this.setState({apiDataLoaded: true, apiData: favorites.data.data, user: this.props.userPage});
    }).catch(err => {
      console.log('nope :', err);
    });
  }

  userRestaurantFavorites() {
    return this.state.apiData.map((el, i) => {
      return (<Link to={`/main/${el.restaurant_id}`}>
        <strong>{el.restaurant_name}</strong>
        <br/>
      </Link>);
    });
  }

  renderUser() {
    if (this.state.apiData.length > 0) {
      return <h1>RESTAURANT USER FAVORITES for {this.state.user}!</h1>;
    } else {
      return <h1>{this.state.user} hasn't favorited any restaurants yet!</h1>;
    }
  }

  render() {
    return (<div className="welcome">
      {
        this.state.apiDataLoaded
          ? this.renderUser()
          : ''
      }
      {
        this.state.apiDataLoaded
          ? this.userRestaurantFavorites()
          : ''
      }
    </div>);
  }
}

export default Home;
