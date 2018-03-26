// import React, {Component} from 'react';
// import '../App.css';
// import axios from 'axios'
// class SearchBar extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       term: 'pizza',
//       location: 'New york',
//       apiDataLoaded: false,
//       apiData: ''
//     };
//
//     this.handleChange = this.handleChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//     this.componentDidMount = this.componentDidMount.bind(this);
//   }
//
//   handleChange(event) {
//     this.setState({term: event.target.value});
//   }
//
//   handleSubmit(event) {
//     console.log('this was typed and entered ' + this.state.term);
//
//     event.preventDefault();
//   }
//
//   render() {
//     return (<form onSubmit={this.handleSubmit}>
//
//       <input type="text" placeholder="search" value={this.state.value} onChange={this.handleChange}/>
//       <input type="submit" value="Submit"/>
//     </form>);
//   }
// }
//
// export default SearchBar
