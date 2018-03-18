import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import axios from 'axios';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
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
