import React, {Component} from 'react';
import axios from 'axios';

class AllFavorites extends Component {
  constructor() {
    super();
    this.state = {
      apiDataLoaded: false,
      apiData: null,
      fireRedirect: false
    };
    this.restaurantNumFavorites = this.restaurantNumFavorites.bind(this);
  }

  componentDidMount() {
    console.log('inside component did mount restaurant user favorites', this.props.match.params.id);
    return axios.get(`/api/favorites/restaurant/num/${this.props.match.params.id}`).then(favorites => {
      console.log('USER FAVORITES ->', favorites.data.data);
      this.setState({apiDataLoaded: true, apiData: favorites.data.data});
    }).catch(err => {
      console.log('nope :', err);
    });
  }

  restaurantNumFavorites() {
    if (this.state.apiDataLoaded) {
      return <p>{this.state.apiData[0].count}</p>;
    }
  }

  render() {
    return (<div className="welcome">
      <h1>NUMBER OF RESTAURANT FAVORITES!</h1>
      {this.restaurantNumFavorites()}
    </div>);
  }
}

export default AllFavorites;
