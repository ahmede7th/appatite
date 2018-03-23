import React, { Component } from 'react';
import axios from 'axios';
import { Redirect, Link } from 'react-router-dom';
import Header from './subComponents/Header';
import RestMap from './RestMap';
import Review from './subComponents/Review';

class RestSingle extends Component {
  constructor() {
    super();
    this.state = {
      apiDataLoaded: false,
      apiData: null,
      fireRedirect: false,
    };
    this.deleteRestaurant = this.deleteRestaurant.bind(this);
    this.goToFavorite = this.goToFavorite.bind(this);
  }

  componentDidMount() {
    return axios
      .get(`/api/restaurant/${this.props.match.params.id}`)
      .then(restaurant => {
        console.log('single ->', restaurant);
        this.setState({
          apiDataLoaded: true,
          apiData: restaurant.data.data[0],
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  deleteRestaurant() {
    return axios
      .delete(`/api/restaurant/delete/${this.props.match.params.id}`)
      .then(restaurant => {
        this.setState({
          fireRedirect: true,
        });
      })
      .catch(err => {
        console.log('error deleting', err);
      });
  }

  goToFavorite() {
    return axios
      .post(
        `/api/favorites/${this.props.match.params.id}`,
        { withCredentials: true },
        {
          headers: {
            user: window.localStorage.getItem('id'),
          },
        },
      )
      .then(favorite => {
        console.console.log('GOT FAVORITE SINGLE PAGE--->', favorite);
        this.setState({
          favorite: true,
        });
      })
      .catch(err => {
        console.log('ERROR IN FAVORITE SINGLE PAGE--->', err);
      });
  }

  render() {
    const name = (this.props.match.params.id).replace(/ /g, "%20")
    return (
			<div className="restaurant-single">
				<Header />
					<h1>single</h1>
					<h2>{this.state.apiDataLoaded ? this.state.apiData.name : 'failed to load'}</h2>
					<button><Link to={`/main/${name}/edit`}>Edit</Link></button>
					<button onClick={this.deleteRestaurant}>Delete posting</button>          
					<RestMap />
					<Review name={this.props.match.params.id} />
          <button onClick={this.goToFavorite}>Favorite This Baby!</button>
          {this.state.fireRedirect ? <Redirect to="/main" /> : ''}
      </div>
    );
  }
}

export default RestSingle;
