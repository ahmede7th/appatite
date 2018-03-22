import React, { Component } from 'react';
import axios from 'axios';

class ReviewEdit extends Component {
	constructor() {
		super();
		this.state = {
			content: '',
			click: false
		}
		this.buttonClick = this.buttonClick.bind(this)
	}

	inputChange(e) {
		let name = e.target.name
		let value = e.target.value
		this.setState({
			[name]: value
		})
	}

	submitForm(e) {
		e.preventDefault()
		axios({
			method: 'PUT',
			url: `/api/review/edit/${this.props.key}`,
			data: {

			}
		})
	}

	buttonClick() {
		this.setState({
			click: !this.state.click
		})
	}

	render() {
		return (
			<div>
				<button onClick={this.buttonClick}>Edit</button>
				{this.state.click ?
					<form>
					<label>
						<input type="hidden" />
					</label>
					</form>
				: ''}
			</div>
		)
	}
}

export default ReviewEdit;
