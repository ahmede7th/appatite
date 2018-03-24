import React, { Component } from 'react';
import axios from 'axios';
import { Redirect, Link } from 'react-router-dom';
import Header from '../subComponents/Header';
import RestMap from './RestMap';
import Review from '../subComponents/Review';
import {Button} from 'reactstrap';


class RestSingle extends Component {
  constructor() {
    super();
    this.state = {
      apiDataLoaded: false,
      apiData: null,
      fireRedirect: false,
      favorite: false,
      favoriteNumber: null,
      favoriteUsers: null,
    };
    this.deleteRestaurant = this.deleteRestaurant.bind(this);
    this.goToFavorite = this.goToFavorite.bind(this);
    this.renderFavoriteUsers = this.renderFavoriteUsers.bind(this);
  }

  componentDidMount() {
    return axios
      .get(`/api/restaurant/${this.props.match.params.id}`)
      .then(restaurant => {
        this.setState({
          apiDataLoaded: true,
          apiData: restaurant.data.data[0],
        });
        axios
          .get(`/api/favorites/restaurant/num/${this.props.match.params.id}`)
          .then(favorites => {
            console.log('RESTAURANT FAVORITES ->', favorites.data.data[0]);
            this.setState({
              favoriteNumber: favorites.data.data[0].count,
            });
            axios
              .get(
                `/api/favorites/restaurant/users/${this.props.match.params.id}`,
              )
              .then(users => {
                console.log(
                  'USERS WHO LIKE THE RESTAURANT--->',
                  users.data.data,
                );
                const user = users.data.data.filter(function (user) {
                  return (
                    user.username === window.localStorage.getItem('username')
                  );
                });

                console.log('DOES THIS USER LIKE THIS?--->', user);
                if (user.length > 0) {
                  this.setState({
                    favorite: true,
                  });
                }

                this.setState({
                  favoriteUsers: users.data.data,
                });
              })
              .catch(err => {
                console.log('ERROR IN GET USERS WHO LIKE RESTAURANT--->', err);
              });
          })
          .catch(err => {
            console.log('nope :', err);
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
    console.log('HELLOOOOOOO?!');
    return axios
      .post(
        `/api/favorites/${this.props.match.params.id}`,
        { withCredentials: true },
        {
          headers: {
            user: window.localStorage.getItem('id'),
            user_name: window.localStorage.getItem('username'),
            restaurant_name: this.state.apiData.name,
          },
        },
      )
      .then(favorite => {
        this.setState({
          favorite: true,
        });
      })
      .catch(err => {
        this.setState({
          favorite: !this.state.favorite,
        });
      });
  }

  renderFavoriteUsers() {
    console.log('RENDER FAVORITE USERS--->', this.state.favoriteUsers);
    return this.state.favoriteUsers.map(el => {
      return <p>{el.username}</p>;
    });
  }

  render() {
    return (
      <div className="welcome">
        <Header />
        <br />
        <h2>{this.state.apiDataLoaded ? this.state.apiData.name : ''}</h2>
        <Button color="primary" size="sm" block style={{position:'center', marginBottom: '1rem'}}>
          <Link to={`/main/${this.props.match.params.id}/edit`}>Edit</Link>
        </Button>
        <button onClick={this.deleteRestaurant}>Delete posting</button>
        <RestMap />
        <p>
          Yelp Rating:{' '}
          {this.state.apiDataLoaded ? this.state.apiData.rating : ''} Stars
        </p>
        <p>
          Number of favorites:{' '}
          {this.state.favoriteNumber ? this.state.favoriteNumber : ''}
        </p>
        <p>
          Users who Favorite:{this.state.favoriteUsers
            ? this.renderFavoriteUsers()
            : ''}
        </p>
        <Review name={this.props.match.params.id} />
        <button onClick={this.goToFavorite}>
          {this.state.favorite
            ? 'Unfavorite this baby!'
            : 'Favorite this baby!'}
        </button>
        {this.state.fireRedirect ? <Redirect to="/main" /> : ''}
      </div>
    );
  }
}

export default RestSingle;
