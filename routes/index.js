var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var request = require('request');

mongoose.connect('mongodb://127.0.0.1:27017/Stat');
var stats = require('../models/homePageViews');
var users = require('../models/activeusers');
var userview;

router.get('/', function (req, res, next) {
  let userlist = new users();
  stats.findOneAndUpdate({ name: "counter" }, { $inc: { count: 1 } }, function (err, counter) {
    userlist.count = counter.count;
    userlist.created_at = Date.now();
    userlist.save({});
    if (!counter) {
      res.render('index', { title: "Welcome to Page View Analytic APP", userview: userview });
    }
    else {
      res.render('index', { title: "Welcome to Page View Analytic APP", userview: userview });
    }
  });
  request.get('http://localhost:4000/api/getActiveUsersinTime', function (error, response, body) {
    userview = body;
  });
});


module.exports = router;