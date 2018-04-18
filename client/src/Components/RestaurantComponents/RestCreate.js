import React, {Component} from 'react';
import axios from 'axios';
import {Button} from 'reactstrap'

class RestCreate extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      cuisine: '',
      img_src: '',
      loc: '',
      creator: '',
      fireRedirect: false
    };
    this.inputChange = this.inputChange.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
  }

  inputChange(e) {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({[name]: value});
  }

  formSubmit(e) {
    //e.preventDefault();
    axios({
      method: 'POST',
      url: '/restaurant',
      data: {
        name: this.state.name,
        cuisine: this.state.cuisine,
        img_src: this.state.img_src,
        creator: window.localStorage.getItem('username'),
        loc: this.state.loc
      }
    }).then(restaurant => {
      this.setState({fireRedirect: true});
    }).catch(err => {
      console.log('error in creating', err);
    });
  }

  render() {
    return (<div className="restaurant-create">
      <h1>Add a restaurant</h1>
      <form onSubmit={this.formSubmit}>
        <input class="form__input" pattern=".{1,}" required="required" type="text" name="name" onChange={this.inputChange} placeholder="name of business"/>
        <input class="form__input" pattern=".{1,}" required="required" type="text" name="cuisine" onChange={this.inputChange} placeholder="type of cuisine"/>
        <input class="form__input" pattern=".{1,}" required="required" type="text" name="img_src" onChange={this.inputChange} placeholder="image url"/>
        <input class="form__input" pattern=".{1,}" required="required" type="test" name="loc" onChange={this.inputChange} placeholder="location"/>
        <br />
        <Button color='primary' type="submit" value="Submit">
          Submit
        </Button>
      </form>
      {/* {this.state.fireRedirect ? <Redirect to="/main" /> : ''} */}
    </div>);
  }
}

export default RestCreate;
