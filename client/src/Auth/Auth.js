import React, { Component } from 'react';
import { BrowserRouter, Link, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import TokenService from './Services/TokenService';
import { Redirect } from 'react-router-dom';
import Home from '../Components/Home';
import AuthHome from './AuthHome';
import Login from './Login';
import Register from './Register';

class Auth extends Component {
  constructor(props) {
    super();
    this.state = {
      isLoggedIn: false,
    };
  }

  register(data) {
    console.log(data);
    axios('api/user/auth', {
      method: 'POST',
      data,
    }).then(resp => {
      TokenService.save(resp.data.token);
      this.setState({
        isLoggedIn: true,
      });
    }).catch(err => {
      console.log('ERROR IN CREATING USER IN CLIENT--->', err);
    });
  }

  login(data) {
    console.log(data);
    axios('api/user/auth/login', {
      method: 'POST',
      data,
    }).then(resp => {
      TokenService.save(resp.data.token);
      this.setState({
        isLoggedIn: true,
      });
      console.log('USER LOGGED IT--->', this.state.isLoggedIn);
    }).catch(err => {
      console.log('ERROR IN GETTING USER IN CLIENT--->', err);
    });
  }

  authClick(ev) {
    ev.preventDefault();
    axios('api/restricted', {
      headers: {
        Authorization: `Bearer ${TokenService.read()}`,
      },
    }).then(resp => console.log('AUTH CLICK SUCCESS RESPONSE--->', resp))
    .catch(err => console.log('AUTH CLICK FAILURE RESPONSE--->', err));
  }

  logout(ev) {
    ev.preventDefault();
    TokenService.destroy();
    this.setState({
      isLoggedIn: false,
    });
  }

  checkLogin() {
    axios('api/isLoggedIn', {
      headers: {
        Authorization: `Bearer ${TokenService.read()}`,
      },
    }).then(resp => console.log('CHECK LOGIN SUCCESS RESPONSE--->', resp))
    .catch(err => console.log('CHECK LOGIN FAILURE RESPONSE--->', err));
  }

  render() {
    return (
      <div>
        <div>
          <p><button onClick={this.checkLogin.bind(this)}>Check If Logged In</button></p>
          <p><button onClick={this.logout.bind(this)}>Logout</button></p>
        </div>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={AuthHome} />
            <Route exact path="/register" component={(props) => (
                <Register {...props} submit={this.register.bind(this)} />
            )} />
            <Route exact path="/login" component={(props) => (
              <Login {...props} submit={this.login.bind(this)} />
            )} />
            <Route exact path="/main" component={Home} />
          </Switch>
        </BrowserRouter>
        <BrowserRouter>
          {this.state.isLoggedIn ? <Redirect to="/main" /> : ''}
        </BrowserRouter>
      </div>
    );
  }
}

export default Auth;
