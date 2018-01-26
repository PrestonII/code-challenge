var express = require('express');
var router = express.Router();
const server = require('../lib/zomato-client');

router.get('/', (request, result, next) => {
  if(!request.body)
    return result.sendStatus(400);

  server.getRestaurants()
  
})