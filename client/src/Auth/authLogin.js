import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import UserLoginForm from './UserLoginForm';

export default class authLogin extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(data) {
    console.log(`handling submit: ${data}`);
    this.props.submit(data);
  }

  render() {
    return (
      <div className="welcome">
        <p>I'm a login</p>
        <UserLoginForm submit={this.onSubmit} />
        <p><Link to="/"><button>Back Home</button></Link></p>
      </div>
    );
  }
}
