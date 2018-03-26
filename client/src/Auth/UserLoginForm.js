import React, {Component} from 'react';
import {Button} from 'reactstrap';

export default class UserLoginForm extends Component {
  constructor(props) {
    super(props);

    // set initial state
    this.state = {
      username: '',
      password: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // preventDefault and lift state back up to the parent
  handleSubmit(e) {
    e.preventDefault();
    this.props.submit(this.state);
  }

  // update form state
  handleChange(e) {
    const {name, value} = e.target;
    this.setState({[name]: value});
  }

  render() {
    return (<div className="form__field">
      <form onSubmit={this.handleSubmit}>
        <label>
          User Name -
          <input class="form__input" pattern=".{1,}" required="required" type="text" name="username" onChange={this.handleChange} value={this.state.username}/>
        </label>

        <label>
          Password -
          <input class="form__input" pattern=".{4,}" required="required" type="password" name="password" onChange={this.handleChange} value={this.state.password}/>
          <span class="icon"></span>
        </label>

        <br/>
        <Button color='primary' type="submit" value="Submit">
          Submit
        </Button>
        <br/>
      </form>
    </div>);
  }
}
