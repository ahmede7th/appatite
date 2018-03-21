import React, {Component} from 'react';
import '../App.css';


class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {term:''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({term: event.target.value});
  }

  handleSubmit(event) {
    alert('this was typed and entered ' + this.state.term);

    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>

        <input type="text" placeholder="search" value={this.state.value} onChange={this.handleChange} />

        <input type="submit" value="Submit" />
      </form>
    );
  }
}






//
// class SearchBar extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       term: 'food',
//       location: '10010'
//     }
//     this.handleChange = this.handleChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }
//
//   handleChange(e) {
//     this.props.setState({term: e.target.value});
//   }
//
//   handleSubmit(e) {
//     // console.log('hello').then(e => {
//     //   this.setState({this: e.value})
//     // });
//     e.preventDefault();
//
//     console.log('this.state---->',this.state)
//   }
//
//
//   // <form onSubmit={this.handleSubmit}>
//   //         <label>
//   //           Name:
//   //           <input type="text" value={this.state.value} onChange={this.handleChange} />
//   //         </label>
//   //         <input type="submit" value="Submit" />
//   //       </form>
//
//
//   render() {
//     return (
//       <div className="SearchBar">
//       <form onSubmint={this.handleSubmit}>
//         <input type="text" name="search" placeholder="Search.." value={this.state.term} onChange={this.handleChange}/>
//       <input type="submit" value="Submit" />
//         </form>
//       </div>
//       )
//         }
// }

export default SearchBar
