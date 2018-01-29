const axios = require('axios');
const config = require('./config-defaults');

function Server() {
  console.log("Creating new axios-based server");
}

Server.prototype.getCategories = function() {
  const url = config.url.categories;

  axios
    .get(url, {
      headers: {
        'user-key' : config.user_key
      }
    })
    .then(res => {
      console.log(res.data);
      return res.data;
    })
    .catch(error => {
      console.log("Error!");
      console.log(error);
    });
}

Server.prototype.getRestaurants = function(category) {
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
      return res.data;
    })
    .catch(error => {
      console.log("Error!");
      console.log(error);
    });

}

var server = new Server();
// server.getCategories();
server.getRestaurants();
// module.exports = exports = new Server();