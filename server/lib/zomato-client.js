const axios = require('axios');
const config = require('./config-defaults');

function Server() {
  console.log("Creating new axios-based server");
  this.cuisines = {};
  this.restaurants = {};
  this.restaurantsByCategory = {};
}

Server.prototype.getCategories = function(result) {
  if(this.cuisines !== null) {
    result.send(this.cuisines);
  }

  this.findCuisines(result);
}

Server.prototype.getRestaurants = function(category, result) {
  if(this.restaurantsByCategory.hasOwnProperty(category)) {
    result.send(this.restaurants[category]);
  }

  this.findRestaurants(category, result);
}

Server.prototype.setCuisineData = function(data) {
  this.cuisines = data;
}

Server.prototype.setRestaurantCategoryData = function(cuisineType, data) {
  this.restaurantsByCategory[cuisineType] = data;
  return data;
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
      return res.data;
    })
    .then(data => {
      let mapped = this.mapCuisineData(data);
      return mapped;
    })
    .then((mapped) =>{
      result.send(mapped);
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
      let value = res.data.hasOwnProperty('restaurants') ? res.data.restaurants : new Array();
      return value;
    })
    .then(data =>{
      let mapped = this.mapRestaurantData(data);
      let list = this.setRestaurantCategoryData(category, mapped);
      result.send(list);
    })
    .catch(error => {
      console.log("Error!");
      console.log(error);
    });
}

Server.prototype.mapCuisineData = function(data) {
  var mapped = data.cuisines.map(cuisine => {
    let realData = cuisine.cuisine;
    this.cuisines[realData.cuisine_id] = {
      id: realData.cuisine_id,
      name: realData.cuisine_name
    };
  });

  return mapped;
}

Server.prototype.mapRestaurantData = function(objs) {
  let rlist = {};
  
  const data = objs.map(obj =>{
    let r = obj.restaurant;
    let newObj = {
      id: r.id,
      name: r.name,
      url: r.url,
      location: r.location,
      address: r.location.address,
      canDeliver: r.is_delivering_now !== 0,
      rating: r.user_rating
    };

    this.restaurants[r.id] = newObj;
    return newObj;
  });

  return data;
}

module.exports = exports = new Server();