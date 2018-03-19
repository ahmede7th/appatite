import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class RestCreate extends Component {
	constructor() {
		super();
		this.state={
			name: '',
			cuisine: '',
			img_src: '',
			loc: '',
			fireRedirect: false
		}
	};

	inputChange(e) {
		let name = e.target.name;
		let value = e.target.value;
		this.setState({
			[name]: value
		})
	};

	formSubmit(e) {
		e.preventDefault();	
		axios({
			method: 'POST',
			url: '/api/restaurant',
			data: {
				name: this.state.name,
				cuisine: this.state.cuisine,
				img_src: this.state.img_src,
				loc: this.state.loc
			}
		})
		.then( restaurant => {
			this.setState({
				fireRedirect: true
			})
		})
		.catch(err => {
			console.log('error in creating', err)
		})
	};

	render() {
		return (
			<h1>Create page</h1>
		)
	}
}

export default RestCreate;