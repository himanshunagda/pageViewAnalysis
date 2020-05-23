var express = require('express');
var router = express.Router();
const services = require('../services/services');
var session = require('../../models/session');

const verifyToken = () => {
    return async (req, res, next) => {
        let jwtToken = req.body.token;
        let readFromDB = await session.find({}, "session");
        let result = readFromDB.includes(readFromDB.find(value => value.session === jwtToken));
        if (result === false) {
            res.status(400).send('Server requires application/json')
        } else {
            next()
        }
    }
}
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.get('/getUserCountry', async function (req, res, next) {
    let result = await services.getUserCountry();
    res.send(result.country);
});

router.post('/getUsersFromCountries', verifyToken(), async function (req, res, next) {
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

router.post('/addUserCountry', verifyToken(), async function (req, res, next) {
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

router.get('/viewValue', async function (req, res, next) {
    let result = await services.viewValue();
    res.send(JSON.stringify(result.count));
});

router.get('/addCountryToDB', async function (req, res, next) {
    let result = await services.addCountryToDB();
    res.send(result.country);
});

router.get('/getSession', async function (req, res, next) {
    let result = await services.getSession();
    res.send(result);
});
module.exports = router;
