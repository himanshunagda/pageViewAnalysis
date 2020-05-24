var express = require('express');
var router = express.Router();
const services = require('../services/services');
const auth = require('../middleware/auth');

// API routes for Page Analysis application

/**
 * @name POST 
 * @route {POST} /
 */
router.post('/', function (req, res, next) {
    res.send('running');
});

/**
 * @name POST 
 * @route {POST} /getUserCountry
 */
router.post('/getUserCountry', auth.verifyToken(), async function (req, res, next) {
    let result = await services.getUserCountry();
    res.send(result.country);
});

/**
 * @name POST 
 * @route {POST} /getUsersFromCountries
 */
router.post('/getUsersFromCountries', auth.verifyToken(), async function (req, res, next) {
    let result = await services.getUsersFromCountries();
    res.send(result);
});

/**
 * @name POST 
 * @route {POST} /filterViewsByCountry
 */
router.post('/filterViewsByCountry', auth.verifyToken(), async function (req, res, next) {
    let result = await services.filterViewsByCountry(req.body.country);
    res.send(JSON.stringify(result.value));
});

/**
 * @name POST 
 * @route {POST} /filterViewsByPageId
 */
router.post('/filterViewsByPageId', async function (req, res, next) {
    let result = await services.filterViewsByPageId(req.body.page);
    res.send(JSON.stringify(result));
});

/**
 * @name POST 
 * @route {POST} /addBrowserType
 */
router.post('/addBrowserType', async function (req, res, next) {
    let result = await services.addBrowserType(req.body.browser);
    res.send(result);
});

/**
 * @name GET 
 * @route {GET} /filterViewsByBrowser
 */
router.get('/filterViewsByBrowser', async function (req, res, next) {
    let result = await services.filterViewsByBrowser();
    res.send(result);
});

/**
 * @name GET 
 * @route {GET} /getActiveUsersinTime
 */
router.get('/getActiveUsersinTime', async function (req, res, next) {
    let result = await services.getActiveUsersinTime();
    res.send(JSON.stringify(result.views));
});

/**
 * @name POST 
 * @route {POST} /addUserCountry
 */
router.post('/addUserCountry', auth.verifyToken(), async function (req, res, next) {
    let result = await services.addUserCountry();
    res.send((result));
});

/**
 * @name POST 
 * @route {POST} /filterViewsAboutPage
 */
router.post('/filterViewsAboutPage', auth.verifyToken(), async function (req, res, next) {
    let result = await services.filterViewsAboutPage();
    res.send((result));
});

/**
 * @name POST 
 * @route {POST} /token
 */
router.post('/token', async function (req, res, next) {
    let result = await auth.generateToken(req.body.username);
    res.send(result);
});

/**
 * @name POST 
 * @route {POST} /viewValue
 */
router.post('/viewValue', auth.verifyToken(), async function (req, res, next) {
    let result = await services.viewValue();
    res.send(JSON.stringify(result.count));
});

/**
 * @name POST 
 * @route {POST} /addCountryToDB
 */
router.post('/addCountryToDB', auth.verifyToken(), async function (req, res, next) {
    let result = await services.addCountryToDB();
    res.send(result.country);
});

/**
 * @name POST 
 * @route {POST} /saveSameSession
 */
router.post('/saveSameSession', auth.verifyToken(), async function (req, res, next) {
    let result = await services.saveSameSession(req.body.token);
    res.send(result);
});

/**
 * @name POST 
 * @route {POST} /userRate
 */
router.post('/userRate', auth.verifyToken(), async function (req, res, next) {
    let result = await services.userRate();
    res.send(JSON.stringify(result.value));
});
module.exports = router;
