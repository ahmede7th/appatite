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
import AllFavorites from './Components/AllFavorites';
import Restaurants from './Restaurants';
import NumFavorites from './Components/UserFavorites';
import UserReviews from './Components/UserReviews';
import ReviewEdit from './Components/subComponents/ReviewEdit';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container-fluid router" align="center">
          <Route exact path="/" component={Welcome} />
          <Route path="/register" component={userLogin} />
          <Route path="/login" component={userLogin} />
          <Route exact path="/main" component={Home} />
          <Route exact path="/main/:id" component={RestSingle} />
          <Route path="/main/:id/edit" component={RestEdit} />
          <Route path="/user/favorites" component={AllFavorites} />
          <Route path="/user/favorites/num" component={NumFavorites} />
          <Route path="/user/myreviews" component={UserReviews} />
        </div>
      </Router>
    );
  }
}

export default App;
