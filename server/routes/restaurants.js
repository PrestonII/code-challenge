var express = require('express');
var router = express.Router();

router.get('/', (request, result, next) => {
  if(!request.body)
    return result.sendStatus(400);

  
})