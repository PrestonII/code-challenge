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
      .catch(err => {
        logError(err);
      })
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
          this.all_cuisines = data;
          resolve(data);
        })
        .catch(err => {
          this.logError(err);
          reject(err);
        });
    })
    .catch(err =>{
      console.log(err);
    });

    return promise;
  }

  mapCuisineData(data) {
    let items = data.map(obj => {
      return <li key={obj.cuisine_id}><Category {...obj}/></li>
    });

    return items;
  }

  mapRestaurantData(data) {
    let items = data.map(obj => {
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