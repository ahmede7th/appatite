import React, {Component} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import Header from '../subComponents/Header';

class RestEdit extends Component {
  constructor() {
    super();
    this.state = {
      apiDataLoaded: false,
      newName: '',
      name: '',
      cuisine: '',
      rating: '',
      fireRedirect: false
    };
    this.inputChange = this.inputChange.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
  }

  componentDidMount() {
    return axios.get(`/restaurant/edit/${this.props.match.params.id}`).then(restaurant => {
      console.log('about to edit', restaurant.data.data[0].name);
      this.setState({apiDataLoaded: true, newName: restaurant.data.data[0].name, name: restaurant.data.data[0].name, rating: restaurant.data.data[0].rating, cuisine: restaurant.data.data[0].cuisine});
    }).catch(err => {
      console.log('edit data error', err);
    });
  }

  inputChange(e) {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({[name]: value});
  }

  formSubmit(e) {
    e.preventDefault();
    return axios({
      method: 'PUT',
      url: `/restaurant/edit/${this.props.match.params.id}`,
      data: {
        newName: this.state.newName,
        name: this.state.name,
        cuisine: this.state.cuisine,
        img_src: this.state.img_src,
        loc: this.state.loc
      }
    }).then(restaurant => {
      console.log('submitting form');
      this.setState({fireRedirect: true});
    }).catch(err => {
      console.log('submit error', err);
    });
  }

  render() {
    console.log('this props', this.props);
    return (<div className="restaurant-edit">
      <Header/>
      <h1>Edit: {this.state.name}</h1>
      <form onSubmit={this.formSubmit}>
        <input type="hidden" name="name" value={this.state.name}/>
        <input type="text" onChange={this.inputChange} name="newName" value={this.state.newName}/>
        <input type="text" onChange={this.inputChange} name="cuisine" value={this.state.cuisine}/>
        <input type="number" onChange={this.inputChange} name="rating" value={this.state.rating}/>
        <input type="submit" value="submit"/>
      </form>
      {
        this.state.fireRedirect
          ? (<Redirect to={`/main/${this.props.match.params.id}`}/>)
          : ('')
      }
    </div>);
  }
}

export default RestEdit;
