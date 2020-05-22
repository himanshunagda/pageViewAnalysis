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

router.post('/filterByCountry', async function(req, res, next) {
  console.log(req.body.country);
  let result = await services.getViews(req.body.country);
  res.send(JSON.stringify(result.value));
});

router.post('/page', async function(req, res, next) {
  let result = await services.getViewsByPageId(req.body.page);
  console.log(result);
  res.send(JSON.stringify(result));
});

router.post('/browser', async function(req, res, next) {
  console.log(req.body.browser)
  let result = await services.addBrowser(req.body.browser);
  console.log(result);
  res.send(result);
});

router.get('/readBrowser', async function(req, res, next) {
  let result = await services.getBrowserValue();
  console.log(result);
  res.send(result);
});

router.get('/activeusers', async function(req, res, next) {
  let result = await services.getActiveUsers();
  res.send(JSON.stringify(result.views));
});
module.exports = router;
