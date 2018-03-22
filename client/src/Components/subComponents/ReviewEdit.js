import React, { Component } from 'react';

class ReviewEdit extends Component {
  constructor() {
    super();
    this.state = {
      click: false,
    };
    this.buttonClick = this.buttonClick.bind(this);
  }

  buttonClick() {
    this.setState({
      click: !this.state.click,
    });
  }

  render() {
    return (
      <div>
        <button onClick={this.buttonClick}>Edit</button>
        {this.state.click ? (
          <h1>review edit {this.props.review.content}</h1>
        ) : (
          ''
        )}
      </div>
    );
  }
}

export default ReviewEdit;
