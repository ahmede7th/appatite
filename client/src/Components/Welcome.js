import React, { Component } from 'react';
import axios from 'axios';
import TokenService from '../Auth/Services/TokenService';
import Home from '../Components/Home';

class Welcome extends Component {
  constructor() {
    super();
    this.state = {
      finishRender: false,
    };

    this.renderHome = this.renderHome.bind(this);
    this.renderWelcome = this.renderWelcome.bind(this);
  }

  componentDidMount() {
    axios('api/isLoggedIn', {
      headers: {
        Authorization: `Bearer ${TokenService.read()}`,
      },
    })
      .then(resp => {
        console.log('CHECK LOGIN SUCCESS RESPONSE--->', resp.data);
        this.setState({
          finishRender: resp.data.isLoggedIn,
        });

        return resp.data.isLoggedIn;
      })
      .catch(err => {
        console.log('CHECK LOGIN FAILURE RESPONSE--->', err);
      });
  }

  renderHome() {
    return (
      <div>
        <Home />
      </div>
    );
  }

  renderWelcome() {
    return (
      <div>
        <h1>Welcome</h1>

        <p>
          Are you hungry? Are you always looking for places to eat only to find
          a 5 star rated restaurant written by people who have no idea what good
          food is? You have come to the right place
        </p>

        <button>
          <a href="/register">Sign up</a>
        </button>
        <button>
          <a href="/login">Log In</a>
        </button>
      </div>
    );
  }

  render() {
    return this.state.finishRender ? this.renderHome() : this.renderWelcome();
  }
}

export default Welcome;
