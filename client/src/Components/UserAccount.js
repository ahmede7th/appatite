import React, { Component } from 'react';
import axios from 'axios';
import Header from './subComponents/Header';

class UserAccount extends Component {
	constructor() {
		super();
		this.state={
			apiDataLoaded: false,
			apiData: null,
			fname: '',
			lname: '',
			about_me: '',
			user: window.localStorage.getItem('username'),
			click: false
		}
		this.buttonClick = this.buttonClick.bind(this)
		this.inputChange = this.inputChange.bind(this)
		this.submitForm = this.submitForm.bind(this)
	}

	componentDidMount() {
		axios.get(`/api/user/${this.state.user}`)
			.then(user => {
				console.log('Returned user info: ', user)
				this.setState({
					apiDataLoaded: true,
					apiData: user.data.data
				})
			})
			.catch(err => {
				console.log('Error returning user', err)
			})
	}

	submitForm(e) {
		e.preventDefault()
		axios({
			method: 'PUT',
			url: `/api/user/edit/${this.state.user}`,
			data: {
				fname: this.state.fname,
				lname: this.state.lname,
				about_me: this.state.about_me
			}
		})
	}

	inputChange(e) {
		let name = e.target.name;
		let value = e.target.value;
		this.setState({
			[name] : value
		})
	}

	buttonClick() {
		this.setState({
			click: !this.state.click
		})
	}

	renderUser() {
		const user = this.state.apiData
		return (
			<p>username:  {user.username}<br/>
			   first name:  {user.fname}<br/>
			   last name:  {user.lname}<br/>
			   location:   {user.loc}<br/>
			   about me:   {user.about_me}<br/>
			</p>
		)
	}

	render() {
		return (
			<div>
				<Header />
				<h1>user account</h1>
				{this.state.apiDataLoaded ? this.renderUser() : "loading user"}
				<button onClick={this.buttonClick}>Edit</button>
				{this.state.click ? 
					<form onSubmit={this.submitForm}>
						<input type="text" name="fname" onChange={this.inputChange} value={this.state.fname} placeholder={this.state.apiData.fname} />
						<input type="text" name="lname" onChange={this.inputChange} value={this.state.lname} placeholder={this.state.apiData.lname} />
						<input type="text" name="about_me" onChange={this.inputChange} value={this.state.about_me} placeholder={this.state.apiData.about_me} />
						<input type="submit" value="submit" />
					</form> : ''}
			</div>
		)
	}
}

export default UserAccount