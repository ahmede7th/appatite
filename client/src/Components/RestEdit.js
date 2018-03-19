import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class RestEdit extends Component {
	constructor() {
		super();
		this.state = {
			apiDataLoaded: false,
			newName: '',
			name: '',
			cuisine: '',
			img_src: '',
			loc: '',
			fireRedirect: false
		}
		this.inputChange = this.inputChange.bind(this)
		this.formSubmit = this.formSubmit.bind(this)
	};

	componentDidMount() {
		return axios.get(`/api/restaurant/${this.props.match.params.id}`)
			.then(restaurant => {
				console.log('about to edit', restaurant.data.data[0].name)
				this.setState({
					apiDataLoaded: true,
					newName: restaurant.data.data[0].name,
					name: restaurant.data.data[0].name,
					cuisine: restaurant.data.data[0].cuisine,
					img_src: restaurant.data.data[0].img_src,
					loc: restaurant.data.data[0].loc
				})
			})
			.catch(err => {
				console.log('edit data error', err)
			})
	};

	inputChange(e) {
		let name = e.target.name;
		let value = e.target.value;
		this.setState({
			[name]: value
		})
	}

	formSubmit(e) {
		e.preventDefault();
			return axios({
				method: 'PUT',
				url: `/api/restaurant/edit/${this.props.match.params.id}`,
				data: {
					newName: this.state.newName,
					name: this.state.name,
					cuisine: this.state.cuisine,
					img_src: this.state.img_src,
					loc: this.state.loc
				}
			})
			.then(restaurant => {
				console.log('submitting form')
				this.setState({
					fireRedirect: true
				})
			})
			.catch(err => {
				console.log('submit error', err)
			})
	}

	render() {
		console.log('this props', this.props)
		return (
			<div className="restaurant-edit">
				<h1>Edit:  {this.state.name}</h1>
				<form onSubmit={this.formSubmit}>
					
					<input type='text' onChange={this.inputChange} name='newName' value={this.state.name} />
					<input type='text' onChange={this.inputChange} name='cuisine' value={this.state.cuisine} />
					<input type='text' onChange={this.inputChange} name='img_src' value={this.state.img_src} />
					<input type='text' onChange={this.inputChange} name='loc' value={this.state.loc} />
					<input type='submit' value='submit' />
				</form>
				{this.state.fireRedirect ? <Redirect to={`/main/${this.props.match.params.id}`} /> : '' }
			</div>
		)
	}
}

export default RestEdit;