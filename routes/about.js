var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/Stat');
var about = require('../models/about');
console.log(about);

router.get('/', function (req, res, next) {
  about.findOneAndUpdate({ name: "counter" }, { $inc: { count: 1 } }, function (err, counter) {
    res.send('Please use tinder for more info');
   // if (err) throw err;
/*     if (!counter) {
      res.render('index', { title: "Welcome to Page View Analytic APP", counter: counter.count });
    }
    else {
      res.render('index', { title: "Welcome to Page View Analytic APP", counter: counter.count });
    } */
  });
});

module.exports = router;