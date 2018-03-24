import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import UserLoginForm from './UserLoginForm';
import {Button} from 'reactstrap';

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
        <h1>Login</h1>
        <UserLoginForm submit={this.onSubmit} /><br/>
        <p><Link to="/"><Button color='primary'>Back Home</Button></Link></p>
      </div>
    );
  }
}
