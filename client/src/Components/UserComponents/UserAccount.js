import React, {Component} from 'react';
import axios from 'axios';
import TokenService from '../../Auth/Services/TokenService';
import Header from '../subComponents/Header';
import Welcome from '../Welcome';
import UserNumFavorites from './UserNumFavorites';
import UserRestaurantFavorites from './UserRestaurantFavorites';
import {Button} from 'reactstrap';

class UserAccount extends Component {
  constructor() {
    super();
    this.state = {
      apiDataLoaded: false,
      apiData: null,
      fname: '',
      lname: '',
      about_me: '',
      user: window.localStorage.getItem('username'),
      click: false,
      logoutUser: false
    };
    this.buttonClick = this.buttonClick.bind(this);
    this.inputChange = this.inputChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
  }

  componentDidMount() {
    axios.get(`/api/user/${this.state.user}`).then(user => {
      console.log('Returned user info: ', user);
      this.setState({apiDataLoaded: true, apiData: user.data.data});
    }).catch(err => {
      console.log('Error returning user', err);
    });
  }

  submitForm(e) {
    axios({
      method: 'PUT',
      url: `/api/user/edit/${this.state.user}`,
      data: {
        username: this.state.user,
        fname: this.state.fname,
        lname: this.state.lname,
        about_me: this.state.about_me
      }
    });
  }

  inputChange(e) {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({[name]: value});
  }

  buttonClick() {
    this.setState({
      click: !this.state.click
    });
  }

  deleteUser() {
    if (window.confirm('Are you sure?')) {
      alert('account deleted');
      axios.delete(`/api/user/delete/${this.state.user}`).then(user => {
        console.log('DELETED USER', user);
        TokenService.destroy();
        this.setState({logoutUser: true});
      }).catch(err => {
        console.log('ERROR deleting user', err);
      });
    } else {
      alert('you canceled');
    }
  }

  renderUser() {
    const user = this.state.apiData;
    return (<div>
      <UserNumFavorites/>
      <UserRestaurantFavorites user={this.props.match.params.id}/>
      <p>
        username: {user.username}
        <br/>
        first name: {user.fname}
        <br/>
        last name: {user.lname}
        <br/>
        location: {user.loc}
        <br/>
        about me: {user.about_me}
        <br/>
      </p>
    </div>);
  }

  render() {
    if (this.state.logoutUser) {
      return <Welcome/>
    } else {
      return (<div className="welcome">
        <Header/>
        <h1>user account</h1>
        {
          this.state.apiDataLoaded
            ? this.renderUser()
            : "loading user"
        }
        <br/>
        <Button color="warning" onClick={this.buttonClick}>Edit</Button>{' '}{' '}
        <Button color="danger" onClick={this.deleteUser}>Delete</Button>
        {
          this.state.click
            ? <form onSubmit={this.submitForm}>
                <input type="text" name="fname" onChange={this.inputChange} value={this.state.fname} placeholder={this.state.apiData.fname}/>
                <input type="text" name="lname" onChange={this.inputChange} value={this.state.lname} placeholder={this.state.apiData.lname}/>
                <input type="text" name="about_me" onChange={this.inputChange} value={this.state.about_me} placeholder={this.state.apiData.about_me}/>
                <input type="submit" value="submit"/>
              </form>
            : ''
        }
      </div>)
    }
  }
}

export default UserAccount;
