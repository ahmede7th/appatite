<<<<<<< HEAD:client/src/Components/userLogin.js
import React, { Component } from 'react';
import { BrowserRouter, Link, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import TokenService from '../Auth/Services/TokenService';
import { Redirect } from 'react-router-dom';
import Home from '../Components/Home';
import Register from '../Auth/Register';
import Login from '../Auth/authLogin';
import history from '../Auth/Services/history';

class userLogin extends Component {
  constructor(props) {
    super();
    this.state = {
      finishRender: false,
    };
    this.renderLogin = this.renderLogin.bind(this);
    this.renderHome = this.renderHome.bind(this);
  }

  register(data) {
    console.log(data);
    axios('api/user/auth', {
      method: 'POST',
      data,
    }).then(resp => {
      TokenService.save(resp.data.token);
      TokenService.saveUser(resp.data.user.id);
      console.log('USER IS REGISTERED--->', resp.data.token);
      this.setState({
        redirect: true,
      });
    }).catch(err => {
      console.log('ERROR IN CREATING USER IN CLIENT--->', err);
    });
  }

  login(data) {
    console.log(data);
    axios('api/user/auth/login', {
      method: 'POST',
      data,
    }).then(resp => {
      TokenService.save(resp.data.token);
      TokenService.saveUser(resp.data.user.id);
      this.setState({
        redirect: true,
      });
      console.log('USER LOGGED IN--->', this.state.isLoggedIn);
    }).catch(err => {
      console.log('ERROR IN GETTING USER IN CLIENT--->', err);
    });
  }

  componentDidMount() {
    axios('api/isLoggedIn', {
      headers: {
        Authorization: `Bearer ${TokenService.read()}`,
      },
    }).then(resp => {
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

  renderLogin() {
    return (
      <div>
				<div>
            <Route exact path="/register" component={(props) => (
                <Register {...props} submit={this.register.bind(this)} />
            )} />
            <Route exact path="/login" render={(props) => (
              <Login {...props} submit={this.login.bind(this)} />
            )} />
					</div>
      </div>
    );
  }
=======
// import React, { Component } from 'react';
// import { BrowserRouter, Link, Switch, Route } from 'react-router-dom';
// import axios from 'axios';
// import TokenService from './Services/TokenService';
// import { Redirect } from 'react-router-dom';
// import Home from '../Components/Home';
// import AuthHome from './AuthHome';
// import Login from './Login';
// import Register from './Register';
// import history from './Services/history';
// // import AuthRoutes from '../Components/Routes/AuthRoutes';

// class Auth extends Component {
//   constructor(props) {
//     super();
//     this.state = {
//       redirect: false,
//     };
//     this.renderLogin = this.renderLogin.bind(this);
//     this.renderHome = this.renderHome.bind(this);
//   }

//   register(data) {
//     console.log(data);
//     axios('api/user/auth', {
//       method: 'POST',
//       data,
//     }).then(resp => {
//       TokenService.save(resp.data.token);
//       this.setState({
//         redirect: true,
//       });
//     }).catch(err => {
//       console.log('ERROR IN CREATING USER IN CLIENT--->', err);
//     });
//   }

//   login(data) {
//     console.log(data);
//     axios('api/user/auth/login', {
//       method: 'POST',
//       data,
//     }).then(resp => {
//       TokenService.save(resp.data.token);
//       this.setState({
//         redirect: true,
//       });
//       console.log('USER LOGGED IN--->', this.state.isLoggedIn);
//     }).catch(err => {
//       console.log('ERROR IN GETTING USER IN CLIENT--->', err);
//     });
//   }

//   authClick(ev) {
//     ev.preventDefault();
//     axios('api/restricted', {
//       headers: {
//         Authorization: `Bearer ${TokenService.read()}`,
//       },
//     }).then(resp => console.log('AUTH CLICK SUCCESS RESPONSE--->', resp))
//     .catch(err => console.log('AUTH CLICK FAILURE RESPONSE--->', err));
//   }

//   logout(ev) {
//     ev.preventDefault();
//     TokenService.destroy();
//     this.setState({
//       redirect: false,
//     });
//   }

//   checkLogin() {
//     axios('api/isLoggedIn', {
//       headers: {
//         Authorization: `Bearer ${TokenService.read()}`,
//       },
//     }).then(resp => console.log('CHECK LOGIN SUCCESS RESPONSE--->', resp.data))
//     .catch(err => console.log('CHECK LOGIN FAILURE RESPONSE--->', err));
//   }

//   renderLogin() {
//     return (
//       <div>
//         <div>
//           <p><button onClick={this.checkLogin.bind(this)}>Check If Logged In</button></p>
//           <p><button onClick={this.logout.bind(this)}>Logout</button></p>
//         </div>
//         <BrowserRouter>
//           <Switch>
//             <Route exact path="/" component={AuthHome} />
//             <Route exact path="/register" component={(props) => (
//                 <Register {...props} submit={this.register.bind(this)} />
//             )} />
//             <Route exact path="/login" render={(props) => (
//               <Login {...props} submit={this.login.bind(this)} />
//             )} />
//             <Route exact path="/home" component={Home} />
//           </Switch>
//         </BrowserRouter>
//       </div>
//     );
//   }
>>>>>>> 59f1428af8c944b7c355b61de287384b5b69e711:client/src/Auth/Auth.js

//   renderHome() {
//     return (
//       <div>
//         <Home />
//       </div>
//     );
//   }

<<<<<<< HEAD:client/src/Components/userLogin.js
  render() {
    return this.state.finishRender || this.state.redirect ? this.renderHome() : this.renderLogin();
  }
}

export default userLogin;
=======
//   render() {
//     return this.state.redirect ? this.renderHome() : this.renderLogin();
//   }
// }

// export default Auth;
>>>>>>> 59f1428af8c944b7c355b61de287384b5b69e711:client/src/Auth/Auth.js
