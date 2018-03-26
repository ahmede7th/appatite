import React, {Component} from 'react';
import axios from 'axios';
import TokenService from '../Auth/Services/TokenService';
import Home from '../Components/Home';
import {Collapse, Button, CardBody, Card} from 'reactstrap';

class Welcome extends Component {
  constructor() {
    super();
    this.state = {
      finishRender: false,
      collapse: false
    };

    this.renderHome = this.renderHome.bind(this);
    this.renderWelcome = this.renderWelcome.bind(this);
    this.toggle = this.toggle.bind(this)
  }

  toggle() {
    this.setState({
      collapse: !this.state.collapse
    })
  }

  componentDidMount() {
    axios('api/isLoggedIn', {
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

  renderHome() {
    return (<div>
      <Home/>
    </div>);
  }

  renderWelcome() {
    return (<div className="welcome">

      <div>
        <Button color="primary" size="lg" onClick={this.toggle} block="block" style={{
            position: 'center',
            marginBottom: '1rem'
          }}>Welcome</Button>
      </div>

      <Collapse isOpen={this.state.collapse}>
        <div>
          <h1>App-A-TITE</h1>
          <p>
            Are you hungry? Are you always looking for places to eat only to find a 5 star rated restaurant written by people who have no idea what good food is? You have come to the right place
          </p>
          <div>
            <Button outline="outline" color="primary">
              <a href="/register">Sign up</a>
            </Button>
            <Button outline="outline" color="primary">
              <a href="/login">Log In</a>
            </Button>
          </div>
        </div>

      </Collapse>
    </div>)
  }

  render() {
    return this.state.finishRender
      ? this.renderHome()
      : this.renderWelcome();
  }
}

export default Welcome;
