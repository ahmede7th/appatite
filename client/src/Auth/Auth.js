import React, { Component } from 'react';
import { BrowserRouter, Link, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import TokenService from './Services/TokenService';

class Auth extends Component {
  register(data) {
    console.log(data);
    axios('api/user/', {
      method: 'POST',
      data,
    }).then(resp => {
      TokenService.save(resp.data.token);
    }).catch(err => {
      console.log('ERROR IN CREATING USER IN CLIENT--->', err);
    });
  }

  login(data) {
    axios('api/user/login', {
      method: 'POST',
      data,
    }).then(resp => {
      TokenService.save(resp.data.token);
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
          Weird button: <button onClick={this.authClick.bind(this)}>Weird Button</button>
          <p><button onClick={this.checkLogin.bind(this)}>Check If Logged In</button></p>
          <p><button onClick={this.logout.bind(this)}>Logout</button></p>
        </div>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/register" component={(props) => (
                <Register {...props} submit={this.register.bind(this)} />
            )} />
          <Route exact path="/login" component={(props) => (
            <Login {...props} submit={this.login.bind(this)} />
          )} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default Auth;
