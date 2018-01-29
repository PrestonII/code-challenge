import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import HomePage from './pages/01_Home';
import CuisinePage from './pages/02_CuisineDisplay';
import RestaurantPage from './pages/03_RestaurantDisplay';
import DetailPage from './pages/04_RestaurantDetailDisplay';
import Category from './components/Category';
import Restaurant from './components/Restaurant';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      cuisines: null,
      restaurants: null
    };
    this.all_cuisines = [];
    this.all_restaurants = [];
  }

  componentDidMount() {
    this.initialize();
  }

  initialize() {
    if(this.state.cuisines === null && this.state.restaurants === null) {
      this.getData();
    }
  }

  getData() {
    this.getCuisines();
  }

  setData(newCuisines, newRestaurants) {
    this.setState({
      cuisines: newCuisines,
      restaurants: newRestaurants
    });
  }

  setRestaurants(data) {
    this.setState({
      restaurants: data
    });
  }

  setCuisines(data) {
    this.setData({
      cuisines: data
    });
  }

  getCuisines() {
    this.findCuisines()
      .then(() => {
        this.findRestaurants();
      })
      .then(() => {
        this.mapCuisineData(this.all_cuisines);
      })
      .then(() => {
        this.mapRestaurantData(this.all_restaurants);
      })
      .catch(this.logError);
  }

  getRestaurant(cuisine) {

  }

  findCuisines() {
    let promise = new Promise((resolve, reject) => {

      fetch('api/cuisines')
        .then(resp => {
          return resp.json();
        })
        .then((data) => {
          this.all_cuisines = data.cuisines;
        })
        .catch(err => {
          this.logError(err);
          reject(err);
        });

      resolve(this.all_cuisines);
    })
    .catch(err =>{
      console.log(err);
    });

    return promise;
  }

  findRestaurants() {
    var cuisines = this.all_cuisines;

    cuisines.forEach(cuis => {
      let cat = cuis.cuisine.cuisine_id;
      let rests = this.findRestaurantForCategory(cat);
      if(Object.keys(rests).length > 0){
        rests.map(rest => {
          this.all_restaurants.push(rest);
        });
      }
    });
  }

  findRestaurantForCategory(category) {
    fetch('api/restaurants')
      .then(resp => {
        return resp.json();
      })
      .catch(this.logError);
  }

  mapCuisineData(data) {
    let items = data.cuisines.map(item => {
      let obj = item.cuisine;
      return <li key={obj.cuisine_id}><Category {...obj}/></li>
    });

    return items;
  }

  mapRestaurantData(data) {
    let items = data.restaurants.map(item => {
      let obj = item.restaurant;
      return <li key={obj.id}><Restaurant {...obj}/></li>
    });

    return items;
  }

  logError(err) {
    console.log(err);
  }

  render() {
    return(
      <Router>
        <div>
          <Route exact path="/" component={HomePage}/>
          <Route exact path="/cuisines" render={(props) => <CuisinePage {...props} cuisines={this.state.cuisines} /> }/>
          <Route exact path="/cuisines/:categoryName" component={RestaurantPage}/>
          <Route exact path="/cuisines/:categoryName/:rest_name" component={DetailPage}/>
        </div>
      </Router>
    );
  }
}

export default App;