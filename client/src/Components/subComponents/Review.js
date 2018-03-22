import React, { Component } from 'react';
import axios from 'axios';

class Review extends Component {
	constructor() {
		super();
		this.state={
			apiDataLoaded: false,
			apiData: null,
			show: false,
			user: window.localStorage.getItem('username'),
			user_id: '',
			content: '',
			fireRedirect: false
		}
		this.inputChange = this.inputChange.bind(this)
		this.formSubmit = this.formSubmit.bind(this)
		this.buttonClick = this.buttonClick.bind(this)
	}

	componentDidMount() {
		axios.get(`/api/review/${this.props.name}`)
			.then(review => {
				console.log('all reviews', review)
				this.setState({
					apiDataLoaded: true,
					apiData: review.data.data
				})
			})
			.catch(err => {
				console.log('no reviews exists')
			});
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
		console.log('FORM SUBMIT --->', this.state.user_id);
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

	editReview() {
		axios({
			method: 'PUT',
			url: '/api/'
		})
	}

	showReviews() {
		if (this.state.apiDataLoaded) {
			return this.state.apiData.map((el, i) => {
				return <p>{el.content}</p>
			})
		}
	}

	render() {
		console.log('current user: ', this.state.user_id)
		console.log('apiData', this.state.apiData)
		return (
			<div className="review">
			 	{this.state.apiDataLoaded ? this.showReviews() : 'no reviews'}
				<div class="form-group">
				<button onClick={this.buttonClick}>Review</button>
					<div class="col-md-4">
				   		{this.state.show ?
					   		<form onSubmit={this.formSubmit}>
					   			<input type="hidden" name={this.state.user_id} />
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
