import React, { Component } from 'react';
import './App.css';

import axios from 'axios'

class Restaurants extends Component {

  constructor(){
    super();
    this.state={
      apiDataLoaded:false,
      apiData:null,
      apiKey:'xJjNsj4RmbcDR8jxrabVdG5hRpgkvMRStRNwJC5OurUUy14vSSgKyqTCQ-wZ0NbuM7Jg4yj8_il2FVeVSgC3Usd7D_Xvf6v6OVJ3gSedXlOpcJzl8VWleQHRDPyuWnYx',
      searchRequest:{
        term:'food',
        location: '11218'
      }
    };
  };

  componentDidMount(){
    axios({
    method: 'post',
    url: '/api/restaurant',
    data: {
      term: this.state.searchRequest.term,
      location: this.state.searchRequest.location
    }
  })
  .then(response => {
    console.log('mounted with data', response)
    this.setState({
      apiDataLoaded:true,
      apiData: response.data
    })
  })
  }


//const prettyJson = JSON.stringify(firstResult, null, 4);


  renderRestaurants(){
    console.log('loaded data',this.state.apiData.data)
    return this.state.apiData.data.businesses.map( (el, i) => {
      return <h1 key={el.id}>{el.name}</h1>
    })
  }


  render() {
    return (
      <div className="Restaurant">
        <div>
        <h1>{this.state.apiDataLoaded ? this.renderRestaurants():'NOTHING RENDERING'}</h1>


      </div>
        </div>
    );
  }
}

export default Restaurants;
