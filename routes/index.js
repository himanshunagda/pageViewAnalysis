var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var request = require('request');

mongoose.connect('mongodb://127.0.0.1:27017/Stat');
var stats = require('../models/homePageViews');
var addCountry = require('../models/country');
var users = require('../models/activeusers');
var country;
var userview;

router.get('/', function (req, res, next) {
  let list = new addCountry();
  list.country = country;
  let userlist = new users();
  stats.findOneAndUpdate({ name: "counter" }, { $inc: { count: 1 } }, function (err, counter) {
    userlist.count = counter.count;
    userlist.created_at = Date.now();
    userlist.save(function (err, result) {
    });
    if (err) throw err;
    if (!counter) {
      res.render('index', { title: "Welcome to Page View Analytic APP", counter: counter.count, country: country, userview: userview });
    }
    else {
      res.render('index', { title: "Welcome to Page View Analytic APP", counter: counter.count, country: country, userview: userview });
    }
  });

  list.save(function (err, counter) {
  });

  request.get('http://localhost:4000/api/getUserCountry', function (error, response, body) {
    country = body;
  });
  request.get('http://localhost:4000/api/getActiveUsersinTime', function (error, response, body) {
    userview = body;
  });
});


module.exports = router;