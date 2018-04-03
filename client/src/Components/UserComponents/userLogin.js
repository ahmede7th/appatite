import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import axios from 'axios';
import TokenService from '../../Auth/Services/TokenService';
import Home from '../../Components/Home';
import Register from '../../Auth/Register';
import Login from '../../Auth/authLogin';

class userLogin extends Component {
  constructor(props) {
    super();
    this.state = {
      finishRender: false
    };
    this.renderLogin = this.renderLogin.bind(this);
    this.renderHome = this.renderHome.bind(this);
  }

  register(data) {
    console.log(data);
    axios('https://app-a-tite.herokuapp.com/api/user/auth', {
      method: 'POST',
      data
    }).then(resp => {
      console.log(resp);
      TokenService.save(resp.data.token);
      TokenService.saveUserId(resp.data.user.id);
      TokenService.saveUsername(resp.data.user.username);
      console.log('USER IS REGISTERED--->', resp.data.token);
      this.setState({redirect: true});
    }).catch(err => {
      console.log('ERROR IN CREATING USER IN CLIENT--->', err);
    });
  }

  login(data) {
    axios('https://app-a-tite.herokuapp.com/api/user/auth/login', {
      method: 'POST',
      data
    }).then(resp => {
      console.log(resp);
      TokenService.save(resp.data.token);
      TokenService.saveUserId(resp.data.user.id);
      TokenService.saveUsername(resp.data.user.username);
      this.setState({redirect: true});
      console.log('USER LOGGED IN--->', this.state.isLoggedIn);
    }).catch(err => {
      console.log('ERROR IN GETTING USER IN CLIENT--->', err);
    });
  }

  componentDidMount() {
    axios('https://app-a-tite.herokuapp.com/api/isLoggedIn', {
      headers: {
        Authorization: `Bearer ${TokenService.read()}`
      }
    }).then(resp => {
      console.log('CHECK LOGIN SUCCESS RESPONSE--->', resp.data);
      this.setState({finishRender: resp.data.isLoggedIn});
      return resp.data.isLoggedIn;
    }).catch(err => {
      console.log('CHECK LOGIN FAILURE RESPONSE--->', err);
    });
  }

  renderLogin() {
    return (<div className="welcome">
      <div>
        <Route exact="exact" path="/register" component={(props) => (<Register {...props} submit={this.register.bind(this)}/>)}/>
        <Route exact="exact" path="/login" render={(props) => (<Login {...props} submit={this.login.bind(this)}/>)}/>
      </div>
    </div>);
  }

  renderHome() {
    return (<div>
      <Home/>
    </div>);
  }

  render() {
    return this.state.finishRender || this.state.redirect
      ? this.renderHome()
      : this.renderLogin();
  }
}

export default userLogin;
