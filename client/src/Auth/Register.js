import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import UserRegisterForm from './UserRegisterForm';
import {Button} from 'reactstrap';
export default class Register extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(data) {
    this.props.submit(data);
  }

  render() {
    return (
      <div className="welcome">
        <h1>Registration</h1>
        <UserRegisterForm submit={this.onSubmit} />
        <p><Link to="/"><Button color="primary">Back Home</Button></Link></p>
        <p>Password must be minimum of 6 chars</p>
      </div>
    );
  }
}
