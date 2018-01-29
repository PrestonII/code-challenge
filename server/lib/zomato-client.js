const axios = require('axios');
const config = require('./config-defaults');

function Server() {
  console.log("Creating new axios-based server");
  this.cuisines = null;
  this.restaurants = null;
}

Server.prototype.getCategories = function(result) {
  if(this.cuisines !== null) {
    result.send(this.cuisines);
  }

  this.findCuisines(result);
}

Server.prototype.getRestaurants = function(category, result) {
  if(this.restaurants !== null) {
    result.send(this.restaurants);
  }

  this.findRestaurants(category, result);
}

Server.prototype.setCuisineData = function(data) {
  this.cuisines = data;
}

Server.prototype.setRestaurantData = function(data) {
  this.restaurants = data;
}

Server.prototype.findCuisines = function(result) {
  const url = config.url.cuisines;
  const city_id = 280;
  const sort = 'asc';

  axios
    .get(url, {
      headers: {
        'user-key' : config.user_key,
      },
      params: {
        city_id: city_id,
      }
    })
    .then(res => {
      console.log(res.data);
      this.setCuisineData(res.data);
      result.send(this.cuisines);
    })
    .catch(err => {
      console.log(`Error! ${err}`);
    });
}

Server.prototype.findRestaurants = function(category, result) {
  const url = config.url.restaurants;
  const location = '94741';
  const location_type = 'zone';
  const sort = "asc";

  axios
    .get(url, {
      headers: {
        'user-key' : config.user_key,
      },
      params: {
        entity_type: location_type,
        entity_id: location,
        cuisines: category,
        order: sort
      }
    })
    .then(res => {
      console.log(res.data);
      this.setRestaurantData(res.data);
      result.send(this.restaurants);
    })
    .catch(error => {
      console.log("Error!");
      console.log(error);
    });
}

module.exports = exports = new Server();