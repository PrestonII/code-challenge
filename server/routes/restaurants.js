var express = require('express');
var router = express.Router();
var server = require('../lib/zomato-client');

router.get('/', (request, result, next) => {
  if(!request.body)
    return result.sendStatus(400);

  const cuisine_id = request.headers.cuisine;
  server.getRestaurants(cuisine_id, result);
});

module.exports = router;