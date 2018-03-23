import React, { Component } from 'react';
import axios from 'axios';

class Review extends Component {
  constructor() {
    super();
    this.state = {
      initialReviews: false,
      apiData: null,
      showForm: false,
      showAll: false,
      user: window.localStorage.getItem('username'),
      user_id: '',
      restaurant_id: '',
      restaurant_name: '',
      content: '',
      fireRedirect: false,
      restaurantName: '',
    };
    this.inputChange = this.inputChange.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
    this.buttonClickForm = this.buttonClickForm.bind(this);
    this.buttonClickAll = this.buttonClickAll.bind(this);
  }

  componentDidMount() {
    console.log('CURRENT USER--->', window.localStorage.getItem('username'));
    axios
      .get(`/api/review/${this.props.name}`)
      .then(review => {
        console.log('all reviews', review);
        this.setState({
          initialReviews: true,
          apiData: review.data.data,
        });
      })
      .catch(err => {
        console.log('no reviews exists');
      });
  }

  buttonClickForm() {
    console.log(this.props.name);
    axios
      .get(`/api/restaurant/${this.props.name}`)
      .then(restaurant => {
        console.log('got the restaurant', restaurant.data.data[0].name);
        this.setState({
          showForm: !this.state.showForm,
          restaurantName: restaurant.data.data[0].name,
        });
      })
      .catch(err => {
        console.log('getting the restaurant failed--->', err);
      });
  }

  buttonClickAll() {
    this.setState({
      showAll: !this.state.showAll,
      initialReviews: !this.state.initialReviews,
    });
  }

  inputChange(e) {
    let name = e.target.name;
    let value = e.target.value;
    console.log(e.target.name);
    this.setState({
      [name]: value,
    });
  }

  formSubmit(e) {
    axios({
      method: 'POST',
      url: `/api/review/${this.props.name}`,
      data: {
        user_id: window.localStorage.getItem('id'),
        user_name: window.localStorage.getItem('username'),
        restaurant_id: this.props.name,
        restaurant_name: this.state.restaurantName,
        content: this.state.content,
      },
    })
      .then(review => {
        console.log('submitting review', review);
        this.setState({
          fireRedirect: true,
        });
      })
      .catch(err => {
        console.log('error in review', err);
      });
  }

  showReviews() {
    if (this.state.initialReviews) {
      console.log(this.state.apiData);
      return this.state.apiData.map((el, i) => {
        // shows initial 3
        if (i < 3) {
          return (
            <p>
              <small>user: </small>
              <i>{el.user_name}: </i>
              {el.content}
            </p>
          );
        }
      });
    }
  }

  showAllReviews() {
    if (this.state.showAll) {
      return this.state.apiData.map(el => {
        return (
          <p>
            <small>user: </small>
            <i>{el.user_name}: </i>
            {el.content}
          </p>
        );
      });
    }
  }

  render() {
    console.log('current user: ', this.state.user);
    return (
      <div className="review">
        {this.state.initialReviews ? this.showReviews() : ''}
        <button onClick={this.buttonClickAll}>All Reviews</button>
        {this.state.showAll ? this.showAllReviews() : ''}
        <div class="form-group">
          <button onClick={this.buttonClickForm}>Review</button>
          <div class="col-md-4">
            {this.state.showForm ? (
              <form onSubmit={this.formSubmit}>
                <input
                  type="hidden"
                  name={window.localStorage.getItem('username')}
                />
                <input
                  type="hidden"
                  name="restaurant_name"
                  value={this.props.name}
                />
                <textarea
                  class="form-control"
                  type="text"
                  rows="3"
                  onChange={this.inputChange}
                  name="content"
                  placeholder={`leave a review for ${
                    this.state.restaurantName
                  }`}
                />
                <input type="submit" value="submit" />
              </form>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Review;
