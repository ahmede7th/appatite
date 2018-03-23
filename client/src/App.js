import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Welcome from './Components/Welcome';
import Home from './Components/Home';
import userLogin from './Components/UserComponents/userLogin';
import RestSingle from './Components/RestaurantComponents/RestSingle';
import RestEdit from './Components/RestaurantComponents/RestEdit';
import UserNumFavorites from './Components/UserComponents/UserNumFavorites';
import UserRestaurantFavorites from './Components/UserComponents/UserRestaurantFavorites';
import RestaurantUserFavorites from './Components/RestaurantComponents/RestaurantUserFavorites';
import RestaurantNumFavorites from './Components/RestaurantComponents/RestaurantNumFavorites';
import reviewEdit from './Components/subComponents/ReviewEdit';
import UserReviews from './Components/UserComponents/UserReviews';
import UserPage from './Components/UserComponents/UserPage';

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
          <Route exact path="/user/favorites/:id" component={UserRestaurantFavorites} />
          <Route exact path="/user/favorites/num/:id" component={UserNumFavorites} />
          <Route exact path="/restaurant/favorites/:id" component={RestaurantUserFavorites} />
          <Route exact path="/restaurant/favorites/num/:id" component={RestaurantNumFavorites} />
          <Route exact path="/user/:id" component = {UserPage} />
          <Route path="/user/myreviews" component={UserReviews} />
        </div>
      </Router>
    );
  }
}

export default App;
