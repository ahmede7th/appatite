import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import history from './history';
import axios from 'axios';

import Welcome from './Components/Welcome';
import Home from './Components/Home';
import Register from './Components/Register';
import LogIn from './Components/LogIn';
import RestSingle from './Components/RestSingle';
import RestEdit from './Components/RestEdit';
import RestCreate from './Components/RestCreate';

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
        <div className="container-fluid router" align="center">

          <Route exact path="/" component={Welcome} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={LogIn} />
          <Route exact path="/main" component={Home} />
          <Route path="/main/add" component={RestCreate} />
          <Route exact path="/main/:id" component={RestSingle} />
          <Route path="/main/:id/edit" component={RestEdit} />

        </div>
      </Router>
    );
  }
}

export default App;
