import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Restaurant from './Restaurant';

class Category extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        data: []
    }
    this.config = {
      url: {
        base: "https://developers.zomato.com/api/v2.1",
        categories: "https://developers.zomato.com/api/v2.1/categories",
        restaurants: "https://developers.zomato.com/api/v2.1/search"
      },
      user_key: "d2b02bc31ac7f50438898aa6eee10504",
      request_type: "application/json"
    };
    this.name = props.name || "Loading...";
    this.id = props.id.toString();
    this.location_type = "zone";
    this.location_id = "94741";
    this.restaurants = null;
    this.getRestaurants = this.getRestaurants.bind(this);
  }

  getRestaurants() {
    console.log('Getting restaurants...');
    axios
    .get(this.config.url.restaurants, {
      headers: {
        "user-key" : this.config.user_key,
        "category" : this.id,
        "entity-id" : this.location_id,
        "entity-type" : this.location_type
      }
    })
    .then(res => {
      // this.structureData(res);
      this.restaurants = res.data;
    })
    .catch(error => {
      console.log(error);
    });
  }

  componentDidMount() {
    this.getRestaurants();
  }

  render() {
    return (<li onClick={this.getRestaurants} >{this.name}</li>);
  }
}

Category.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  restaurants: PropTypes.arrayOf(Restaurant),
  // handleClick: PropTypes.func.isRequired,
};

Category.defaultProps = {
    restaurants: []

}

export default Category;