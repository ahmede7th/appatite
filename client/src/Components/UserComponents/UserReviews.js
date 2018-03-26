import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from '../subComponents/Header';
import ReviewEdit from '../subComponents/ReviewEdit';

class UserReviews extends Component {
  constructor() {
    super();
    this.state = {
      apiDataLoaded: false,
      apiData: null,
      user: window.localStorage.getItem('username'),
			restaurantName: '',
    };
    this.buttonClick = this.buttonClick.bind(this);
  }

  componentDidMount() {
    axios
      .get(`/api/review/user/${this.state.user}`)
      .then(reviews => {
        console.log('got back users reviews', reviews);
        this.setState({
          apiDataLoaded: true,
          apiData: reviews.data.data,
        }); 
        // axios
        //   .get(`/api/restaurant/${this.props.name}`)
        //   .then(restaurant => {
        //     console.log('got the restaurant', restaurant.data.data[0].name);
        //     this.setState({
        //       showForm: !this.state.showForm,
        //       restaurantName: restaurant.data.data[0].name,
        //     });
        //   })
        //   .catch(err => {
        //     console.log('getting the restaurant failed--->', err);
        //   });
      })
      .catch(err => {
        console.log('no user reviews', err);
      });
  }

  buttonClick(e) {
    this.setState({
      click: !this.state.click,
      value: e.target.value,
    });
  }

  showAll() {
    console.log('apiData', this.state.apiData);
    return this.state.apiData.map(el => {
      return (
        <div>
          <Link to={`/main/${el.restaurant_id}`}>
            {el.restaurant_name}
            <br />
            
          </Link>
          <p>
            {el.content}
            <br />
            {new Date(el.date_created).toDateString()}
          </p>
          <ReviewEdit review={el} key={el.id} />
          <br />
        </div>
      );
    });
  }

  render() {
    return (
      <div className="welcome">
        <Header />
        <h1>{this.state.user}'s Reviews</h1>
        <p> users reviews </p>
        {this.state.apiDataLoaded ? this.showAll() : ''}
      </div>
    );
  }
}

export default UserReviews;
