import React, { Component } from 'react';
import {Button} from 'reactstrap';

export default class UserRegisterForm extends Component {
  constructor(props) {
    super(props);

    // set initial state
    this.state = {
      username: '',
      password: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // preventDefault and lift state back up to the parent
  handleSubmit(e) {
    e.preventDefault();
    this.props.submit(this.state);
  }

  // update form state
  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            First Name -
            <input
              type="text"
              name="fname"
              onChange={this.handleChange}
              value={this.state.fname}
            />
          </label>
          <label>
            Last Name -
            <input
              type="text"
              name="lname"
              onChange={this.handleChange}
              value={this.state.lname}
            />
          </label>
          <label>
            User Name -
            <input
              type="text"
              name="username"
              onChange={this.handleChange}
              value={this.state.username}
            />
          </label>
          <label>
            Password -
            <input
              type="password"
              name="password"
              onChange={this.handleChange}
              value={this.state.password}
            />
          </label>
          <label>
            About Me-
            <input
              type="text"
              name="about_me"
              onChange={this.handleChange}
              value={this.state.about_me}
            />
          </label>
          <br/>
          <Button color='primary' type="submit" value="Submit">
            Submit
          </Button>
        </form>
      </div>
    );
  }
}
