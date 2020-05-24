var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/Stat', { useNewUrlParser: true, useUnifiedTopology: true });
var about = require('../models/aboutPageViews');

router.get('/', function (req, res, next) {
  about.findOneAndUpdate({ name: "counter" }, { $inc: { count: 1 } }, function (err, counter) {
    res.render('about', { title: "Welcome to Page View Analytic APP", counter: counter.count });   // if (err) throw err;

  });
});

module.exports = router;