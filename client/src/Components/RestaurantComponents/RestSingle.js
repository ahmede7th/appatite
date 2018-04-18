import React, { Component } from 'react';
import axios from 'axios';
import { Redirect, Link } from 'react-router-dom';
import RestMap from './RestMap';
import Review from '../subComponents/Review';
import { Button } from 'reactstrap';

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
      id: null,
      getId: null,
      owner: false,
      displayMessage: '',
      continue: false,
    };
    this.deleteRestaurant = this.deleteRestaurant.bind(this);
    this.goToFavorite = this.goToFavorite.bind(this);
    this.renderFavoriteUsers = this.renderFavoriteUsers.bind(this);
    this.renderOwner = this.renderOwner.bind(this);
  }

  componentDidMount() {
    let getId;
    if (!this.props.id) {
      getId = this.props.match.params.id;
    } else {
      getId = this.props.id;
    }

    return axios
      .get(`/restaurant/${getId}`)
      .then(restaurant => {
        console.log(window.localStorage.getItem('username'), restaurant.data.data[0].creator);
        if (window.localStorage.getItem('username') === restaurant.data.data[0].creator) {
          this.setState({
            owner: true,
          });
        }

        this.setState({
          apiDataLoaded: true,
          apiData: restaurant.data.data[0],
          id: restaurant.data.data[0].id,
          continue: true,
        });
        axios
          .get(`/favorites/restaurant/num/${this.state.id}`)
          .then(favorites => {
            this.setState({
              favoriteNumber: favorites.data.data[0].count,
            });
            axios
              .get(`/favorites/restaurant/users/${this.state.id}`)
              .then(users => {
                const user = users.data.data.filter(function (user) {
                  return (
                    user.username === window.localStorage.getItem('username')
                  );
                });

                if (user.length > 0) {
                  this.setState({
                    favorite: true,
                    displayMessage: 'Users who favorited this restaurant: ',
                  });
                } else if (users.data.data.length > 0) {
                  this.setState({
                    displayMessage: 'Users who favorited this restaurant: ',
                  });
                } else {
                  this.setState({
                    displayMessage: '',
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

  componentWillReceiveProps(nextProps) {
    let getId;
    if (!nextProps.id) {
      getId = this.props.match.params.id;
    } else {
      getId = nextProps.id;
    }

    return axios
      .get(`/restaurant/${getId}`)
      .then(restaurant => {
        if (window.localStorage.getItem('username') === restaurant.data.data[0].creator) {
          this.setState({
            owner: true,
          });
        }

        this.setState({
          apiDataLoaded: true,
          apiData: restaurant.data.data[0],
          id: restaurant.data.data[0].id,
          continueMore: true,
        });
        axios
          .get(`/favorites/restaurant/num/${this.state.id}`)
          .then(favorites => {
            this.setState({
              favoriteNumber: favorites.data.data[0].count,
            });
            axios
              .get(`/favorites/restaurant/users/${this.state.id}`)
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

                if (user.length > 0) {
                  this.setState({
                    favorite: true,
                    displayMessage: 'Users who favorited this restaurant: ',
                  });
                } else if (users.data.data.length > 0) {
                  this.setState({
                    displayMessage: 'Users who favorited this restaurant: ',
                  });
                } else {
                  this.setState({
                    displayMessage: '',
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
      .delete(`/restaurant/delete/${this.state.id}`)
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
        `/favorites/${this.state.id}`,
        { withCredentials: true },
        {
          headers: {
            user: window.localStorage.getItem('id'),
            username: window.localStorage.getItem('username'),
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
    let linkRoute;
    if (this.state.favoriteUsers.length === 0) {
      return '';
    }

    return this.state.favoriteUsers.map((el, id) => {
      if (el.username === window.localStorage.getItem('username')) {
        linkRoute = `/user/account`;
      } else {
        linkRoute  = `/user/page/${el.username}`;
      }

      return (
        <Link key={el.id} to={linkRoute}>
          <p>{el.username}</p>
        </Link>
      );
    });
  }

  renderOwner() {
    if (this.state.owner) {
      return (
        <div>
          <Button color="primary">
            <Link to={`/main/${this.state.id}/edit`} className="welcome">
              Edit
            </Link>
          </Button>
          <Button color="warning" onClick={this.deleteRestaurant}>
            Delete posting
          </Button>
        </div>
      );
    } else {
      return '';
    }
  }

  render() {
    if (this.state.continue) {
      return (
        <div className="home">
          <h1></h1>
          <h2>{this.state.apiDataLoaded ? this.state.apiData.name : ''}</h2>
          {this.state.apiDataLoaded ? this.renderOwner() : ''}
          {this.state.apiDataLoaded ? (
            <RestMap location={this.state.apiData.loc} />
          ) : (
            'failed to load map'
          )}
          <p>
            Yelp Rating:{' '}
            {this.state.apiDataLoaded ? this.state.apiData.rating : ''} Stars
          </p>
          <p>
            {this.state.favoriteNumber > 0 ? `Number of favorites: ${this.state.favoriteNumber}` : ''}
          </p>
          <p>
            {this.state.favoriteUsers ? this.state.displayMessage : ''}
            {this.state.favoriteUsers ? this.renderFavoriteUsers() : ''}
          </p>
          {this.state.apiDataLoaded ? <Review name={this.state.id} /> : ''}
          <Button color="primary" onClick={this.goToFavorite}>
            {this.state.favorite
              ? 'Unfavorite this baby!'
              : 'Favorite this baby!'}
          </Button>
          {this.state.fireRedirect ? <Redirect to="/main" /> : ''}
        </div>
      );
    } else {
      return (
          'loading'
        );
    }
  }
}

export default RestSingle;
