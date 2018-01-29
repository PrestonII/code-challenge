const express = require('express');
const router = express.Router();
const server = require('../lib/zomato-client');
const axios = require('axios');
const config = require('../lib/config-defaults');

router.get('/', (request, result, next) => {
  if(!request.body)
    return result.sendStatus(400);

  server.getCategories(result);
});

module.exports = router;