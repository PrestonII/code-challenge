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

Server.prototype.setCuisineData = function(data) {
  this.cuisines = data;
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

Server.prototype.getRestaurants = function(category, result) {
  /* 
   need category (chosen by user)
   need entity_id (location which should always be manhattan, new york for now)
   need entity_type (always city in this case)
  */
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
        category: category,
        order: sort
      }
    })
    .then(res => {
      console.log(res.data);
      result.send(res.data);
    })
    .catch(error => {
      console.log("Error!");
      console.log(error);
    });

}

// var server = new Server();
// server.getCategories();
// server.getRestaurants();
module.exports = exports = new Server();