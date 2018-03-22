import React, {Component} from 'react';
import '../App.css';
import axios from 'axios'
class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: 'pizza',
      location: 'New york',
      apiDataLoaded: false,
      apiData: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  handleChange(event) {
    this.setState({term: event.target.value});
  }

  handleSubmit(event) {
    alert('this was typed and entered ' + this.state.term);

    event.preventDefault();
  }

componentDidMount(){
  axios({
    method:'post',
    url:`https://api.yelp.com/v3/businesses/search?term=${this.state.term}&location=${this.state.location}`,
    headers: {
            Authorization: 'Bearer xJjNsj4RmbcDR8jxrabVdG5hRpgkvMRStRNwJC5OurUUy14vSSgKyqTCQ-wZ0NbuM7Jg4yj8_il2FVeVSgC3Usd7D_Xvf6v6OVJ3gSedXlOpcJzl8VWleQHRDPyuWnYx',
              }
  }).then(response => {
    console.log(response.data)
  }).catch(err=>{console.log(err)})
}



    render() {
      return (<form onSubmit={this.handleSubmit}>

        <input type="text" placeholder="search" value={this.state.value} onChange={this.handleChange}/>

        <input type="submit" value="Submit"/>
      </form>);
    }
  }

  export default SearchBar
