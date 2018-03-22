import React, { Component } from 'react'

class ReviewEdit extends Component {
	render() {
		return (
			<h1>review edit {this.props.review.content}</h1>
		)
	}
}

export default ReviewEdit;