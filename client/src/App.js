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
        <div className="App">
          <nav>
            <Link to="/"> Home Page</Link>
          </nav>
          <h1>WELCOME TO APP-A-TITE</h1>
          <p>It's time to getcha eat on!</p>
        </div>
      </Router>
    );
  }
}

export default App;
