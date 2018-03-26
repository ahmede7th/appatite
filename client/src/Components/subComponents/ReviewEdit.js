import React, {Component} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import {Button} from 'reactstrap'

class ReviewEdit extends Component {
  constructor() {
    super();
    this.state = {
      content: '',
      click: false,
      fireRedirect: false
    };
    this.buttonClick = this.buttonClick.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.inputChange = this.inputChange.bind(this);
    this.deleteReview = this.deleteReview.bind(this);
  }

  inputChange(e) {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({[name]: value});
  }

  submitForm(e) {
    e.preventDefault();
    axios({
      method: 'PUT',
      url: `/api/review/edit/${this.props.review.id}`,
      data: {
        id: this.props.review.id,
        content: this.state.content
      }
    }).then(review => {
      console.log('Edited a Review', review);
      this.setState({fireRedirect: true});
    }).catch(err => {
      console.log('error in editing review', err);
    });
  }

  deleteReview() {
    return axios.delete(`/api/review/delete/${this.props.review.id}`).then(review => {
      console.log('deleted review', review);
      this.setState({fireRedirect: true});
    }).catch(err => {
      console.log('error deleting', err);
    });
  }

  buttonClick() {
    this.setState({
      click: !this.state.click
    });
  }

  render() {
    console.log('Props id', this.props.review.id);
    return (<div>
      <Button color='primary' onClick={this.buttonClick}>Edit</Button>
      <Button color='primary' onClick={this.deleteReview}>Delete</Button>
      {
        this.state.click
          ? (<form onSubmit={this.submitForm}>
            <input type="hidden" name="id" value={this.props.review.id}/>
            <input type="text" name="content" onChange={this.inputChange} placeholder={this.props.review.content}/>
            <input class="btn btn-primary" type="submit" value="submit"/>
          </form>)
          : ('')
      }
      {
        this.state.fireRedirect
          ? window.location.reload()
          : ''
      }
    </div>);
  }
}

export default ReviewEdit;
