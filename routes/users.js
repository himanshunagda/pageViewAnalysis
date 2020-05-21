var express = require('express');
var router = express.Router();
const services = require('../services/service');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/country', async function(req, res, next) {
  let result = await services.getCountry();
  res.send(result.country);
});

router.get('/countries', async function(req, res, next) {
  let result = await services.getCountries();
  res.send(result);
});
module.exports = router;
