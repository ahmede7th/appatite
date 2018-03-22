import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class Review extends Component {
	constructor() {
		super();
		this.state={
			apiDataLoaded: false,
			apiData: null,
			show: false,
			user: window.localStorage.getItem('id'),
			user_id: '',
			content: '',
			fireRedirect: false
		}
		this.inputChange = this.inputChange.bind(this)
		this.formSubmit = this.formSubmit.bind(this)
		this.buttonClick = this.buttonClick.bind(this)
		this.getUser = this.getUser.bind(this)
	}

	componentDidMount() {
		axios.get(`/api/review/${this.props.name}`)
			.then(review => {
				console.log('single review', review)
				this.setState({
					apiDataLoaded: true,
					apiData: review.data.data
				})
			})
			.catch(err => {
				console.log('no reviews exists')
			})
	}

	buttonClick() {
		this.setState({
			show: !this.state.show
		})
	}

	inputChange(e) {
		let name = e.target.name;
		let value = e.target.value;
		console.log(e.target.name)
		this.setState({
			[name]: value
		})
	};

	formSubmit(e) {
		e.preventDefault()
		axios({
			method: 'POST',
			url: `/api/review/${this.props.name}`,
			data: {
				user_id: this.state.user_id,
				restaurant_name: this.props.name,
				content: this.state.content
			}
		})
		.then(review => {
			console.log('submitting review', review)
			this.setState({
				fireRedirect: true
			})
		})
		.catch(err => {
			console.log('error in review', err)
		})
	}

	getUser() {
		axios.get(`/api/user/${this.state.user}`)
			.then(user => {
				console.log('GOT USER INFO', user)
				this.setState({user_id: user.data.name})
			})
			.catch(err => {
				console.log('Error User info', err)
			})

	}

	render() {
		console.log('USER:', this.state.user)
		console.log('data: ',this.state.apiData)

		return (
			<div className="review">
				<p>Reviews: {this.state.apiData}</p>

				<div class="form-group">
				<button onClick={this.buttonClick}>Review</button>
					<div class="col-md-4">
				   		{this.state.show ?
					   		<form onSubmit={this.formSubmit}>
					   			<input type="hidden" name={this.state.user} />
					   			<input type="hidden" name="restaurant_name" value={this.props.name} />
					  	    	<textarea class="form-control" type="text" rows="3" onChange={this.inputChange} name="content" placeholder={`leave a review for ${this.props.name}`} />
					  	    	<input type="submit" value="submit" />
					  	    </form> : ''}
				    </div>
				</div>
			</div>
		)
	}
}

export default Review;
