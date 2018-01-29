import React, { Component } from 'react';
import { Link, withRouter, Route } from 'react-router-dom';
import RestaurantList from './03_RestaurantDisplay';
import Category from '../components/Category';
import Page from './Page';

class CategoryPage extends Component {
  constructor(props) {
    super(props);
    this.items = [];
    this.state = {
      categories: null,
    };
    this.cuisines = this.props.cuisines;
    this.getCategories = this.getCategories.bind(this);
  }

  componentDidMount() {
    // for if you get a chance to implement redux
    if(this.state.categories === null) {
      this.getCategories();
    }
  }

  getCategories() {
    console.log('Getting cuisine types');

    fetch('api/cuisines')
      .then(resp => {
        return resp.json()
      })
      .then(data => {
        let items = data.cuisines.map(item => {
          let obj = item.cuisine;
          return <li key={obj.cuisine_id}><Category {...obj}/></li>
        });

        let content = <ul>{items}</ul>;

        this.setState({
          categories: content
        });
      })
      .catch(err => {
        console.log(`Error getting types ${err}`);
      });
  }

  render() {
    return (
      <Page name="Cuisines" content={this.state.categories} />
    );
  }
}

export default CategoryPage;
