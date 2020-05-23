var express = require('express');
var router = express.Router();
const services = require('../services/services');

router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.get('/getUserCountry', async function (req, res, next) {
    let result = await services.getUserCountry();
    res.send(result.country);
});

router.get('/getUsersFromCountries', async function (req, res, next) {
    let result = await services.getUsersFromCountries();
    res.send(result);
});

router.post('/filterViewsByCountry', async function (req, res, next) {
    let result = await services.filterViewsByCountry(req.body.country);
    res.send(JSON.stringify(result.value));
});

router.post('/filterViewsByPageId', async function (req, res, next) {
    let result = await services.filterViewsByPageId(req.body.page);
    res.send(JSON.stringify(result));
});

router.post('/addBrowserType', async function (req, res, next) {
    let result = await services.addBrowserType(req.body.browser);
    res.send(result);
});

router.get('/filterViewsByBrowser', async function (req, res, next) {
    let result = await services.filterViewsByBrowser();
    res.send(result);
});

router.get('/getActiveUsersinTime', async function (req, res, next) {
    let result = await services.getActiveUsersinTime();
    res.send(JSON.stringify(result.views));
});

router.get('/addUserCountry', async function (req, res, next) {
    let result = await services.addUserCountry();
    res.send((result));
});

router.get('/filterViewsAboutPage', async function (req, res, next) {
    let result = await services.filterViewsAboutPage();
    res.send((result));
});

router.post('/token', async function (req, res, next) {
    let result = await services.generateToken(req.body.username);
    res.send(result);
});
module.exports = router;
