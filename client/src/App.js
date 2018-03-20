import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import history from './history';
import axios from 'axios';

import Welcome from './Components/Welcome';
import Home from './Components/Home';
import userLogin from './Components/userLogin';
import RestSingle from './Components/RestSingle';
import RestEdit from './Components/RestEdit';
import RestCreate from './Components/RestCreate';
import Restaurants from './Restaurants';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container-fluid router" align="center">
<<<<<<< HEAD
=======
        
>>>>>>> 59f1428af8c944b7c355b61de287384b5b69e711
          <Route exact path="/" component={Welcome} />
          <Route path="/register" component={userLogin} />
          <Route path="/login" component={userLogin} />
          <Route exact path="/main" component={Home} />
          <Route exact path="/main/:id" component={RestSingle} />
          <Route path="/main/:id/edit" component={RestEdit} />
        </div>
      </Router>
    );
  }
}

export default App;