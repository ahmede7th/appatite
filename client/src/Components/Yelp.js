import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Yelp extends Component {
	constructor(props) {
		super(props);
    this.state = {
			name : '',
      img_url:null,
      rating: null,
      categories:null,
      price:null
		}

  }
componentDidMount(){

  console.log('here be your stuff',this.props.yelp)
  this.setState({
    apiDataLoaded: true,
    name: this.props.yelp.name,
    img_url:this.props.yelp.image_url,
    rating:this.props.yelp.rating,
    categories:this.props.yelp.categories[0].title,
    price:this.props.yelp.price
  })
  //const name = props.yelp
}

render() {
    return (
      <div class="restaurant">
  			<h1>{this.state.name}</h1>
        <p><img src={this.state.img_url}></img></p>
        <p>Rating: <small>{this.state.rating}</small></p>
  			<p>Cuisine: <strong>{this.state.categories}</strong></p>
        <p>Price: {this.state.price}</p>
  			<p><Link to={`/main/${this.state.name}`}>Click for more details</Link></p>
  		</div>


    )
  }
}
export default Yelp;
