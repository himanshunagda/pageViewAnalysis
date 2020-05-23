var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/Stat');
//var session = require('../models/session');

router.get('/', function (req, res, next) {
    res.render('login');
});

module.exports = router;