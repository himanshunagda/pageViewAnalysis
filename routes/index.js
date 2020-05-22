var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var request = require('request');

mongoose.connect('mongodb://127.0.0.1:27017/Stat');
var stats = require('../models/stat');
var addCountry = require('../models/country');
var country;

router.get('/', function (req, res, next) {
  let list = new addCountry();
  list.country = country;
  stats.findOneAndUpdate({ name: "counter" }, { $inc: { count: 1 } }, function (err, counter) {
    if (err) throw err;
    if (!counter) {
      res.render('index', { title: "Welcome to Page View Analytic APP", counter: counter.count, country: country });
    }
    else {
      res.render('index', { title: "Welcome to Page View Analytic APP", counter: counter.count, country: country });
    }
  });

  list.save(function (err, counter) {
  });

  request.get('http://localhost:4000/users/country', function (error, response, body) {
    country = body;
  });
});


module.exports = router;