import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import history from './history';
import axios from 'axios';
import './App.css';

class App extends Component {
  // goTo(route) {
  //   this.props.history.replace(`/${route}`);
  // }
  //
  // login() {
  //   this.props.auth.login();
  // }
  //
  // logout() {
  //   this.props.auth.logout();
  // }

  render() {
    return (
      <Router history={history}>
        <div className="container-fluid" align="center">

          <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <Link class="navbar-brand" to="/">Home</Link>
              <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ml-auto">
                  <li class="nav-item">
                    <Link class="nav-link" to="#">My Favorites</Link><span class="sr-only">(current)</span>
                  </li>
                  <li class="nav-item">
                    <Link class="nav-link" to="#">Friends</Link>
                  </li>
                  <li class="nav-item">
                    <Link class="nav-link" to="#">Search</Link>
                  </li>
                  <li class="nav-item">
                    <Link class="nav-link" to="#">...</Link>
                  </li>
                </ul>
              </div>
            </nav>

          <br/>
          <h1>WELCOME TO APP-A-TITE</h1>
          <p>It's time to getcha eat on!</p>

        </div>
      </Router>
    );
  }
}

export default App;
