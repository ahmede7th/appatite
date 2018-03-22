import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class Review extends Component {
	constructor() {
		super();
		this.state={
			initialReviews: false,
			apiData: null,
			showForm: false,
			showAll: false,
			user: window.localStorage.getItem('username'),
			user_id: '',
			content: '',
			fireRedirect: false
		}
		this.inputChange = this.inputChange.bind(this)
		this.formSubmit = this.formSubmit.bind(this)
		this.buttonClickForm = this.buttonClickForm.bind(this)
		this.buttonClickAll = this.buttonClickAll.bind(this)
	}

	componentDidMount() {
		axios.get(`/api/review/${this.props.name}`)
			.then(review => {
				console.log('all reviews', review)
				this.setState({
					initialReviews: true,
					apiData: review.data.data
				})
			})
			.catch(err => {
				console.log('no reviews exists')
			});
	}

	buttonClickForm() {
		this.setState({
			showForm: !this.state.showForm
		})
	}

	buttonClickAll() {
		this.setState({
			showAll: !this.state.showAll,
			initialReviews: !this.state.initialReviews
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
				user_id: this.state.user,
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

	showReviews() {
		if (this.state.initialReviews) {
			return this.state.apiData.map((el, i) => {				// shows initial 3
				if (i < 3) {
					return <p>{el.content}</p>
				}
			})
		}
	}

	showAllReviews() {
		if (this.state.showAll) {
			return this.state.apiData.map((el) => {					// shows all reviews
				return <p>{el.content}</p>
			})
		}
	}

	render() {
		console.log('current user: ', this.state.user)
		console.log('apiData', this.state.apiData)
		return (
			<div className="review">

			 	{this.state.initialReviews ? this.showReviews() : ''}
			 	<button onClick={this.buttonClickAll}>All Reviews</button>
			 		{this.state.showAll ? this.showAllReviews() : ''}
					<div class="form-group">
						<button onClick={this.buttonClickForm}>Review</button>
							<div class="col-md-4">
						   		{this.state.showForm ? 
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