import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      apiDataLoaded: false,
      apiData: null
    };

    this.userRestaurantFavorites = this.userRestaurantFavorites.bind(this);
    this.renderUserFavorites = this.renderUserFavorites.bind(this);
  }

  componentDidMount() {
    const user = window.localStorage.getItem('id');
    axios.get(`/api/favorites/user/restaurants/${user}`).then(favorites => {
      this.setState({apiDataLoaded: true, apiData: favorites.data.data});
    }).catch(err => {
      console.log('nope :', err);
    });
  }

  userRestaurantFavorites() {
    if (this.state.apiDataLoaded) {
      return this.state.apiData.map((el, i) => {
        return <Link to={`/main/${el.restaurant_id}`}>
          <strong>{el.restaurant_name}</strong>
          <br/>
        </Link>
      });
    }
  }

  renderUserFavorites() {
    if (this.state.apiData.length === 0) {
      return `${window.localStorage.getItem('username')+' '} has no favorites!`;
    } else {
      return (<div>
        <p>{window.localStorage.getItem('username')+' '}
           favorited:
          <br/>{this.userRestaurantFavorites()}</p>
      </div>);
    }
  }

  render() {
    return (<div>
      {
        this.state.apiDataLoaded
          ? this.renderUserFavorites()
          : ''
      }
    </div>);
  }
}

export default Home;
