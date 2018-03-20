import React, { Component } from 'react';

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state =   searchRequest:{
            term:'food',
            location: '11218'
          }
    }

    onChange(e) {
        this.props.setState({searchText: e.target.value});
    }

    getResults() {
        console.log('hello').then(e => {
            this.setState({searchResults: e.value})
        });
    }

    render() {
        return (
            <div>

            </div>
        )
    }
}
