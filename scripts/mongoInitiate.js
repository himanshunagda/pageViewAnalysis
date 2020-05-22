const mongoose = require('mongoose');
const Stats = require('../models/stat');
const country = require('../models/country');
const about = require('../models/about');
const browser = require('../models/browser');
const users = require('../models/activeusers');

mongoose.connect('mongodb://localhost:27017/Stat', { useNewUrlParser: true });

let data = {
  "name": "counter",
  "count": 0,
};

let userdata = {
  "name": "counter",
  "count": 0,
  "created_at": "2020-05-20T09:36:01.616Z"
};
let count = {
  "country": null
}

let browserData = {
  "browser": null
}


Stats.create(data, (err) => {
  if (err) { throw (err) }
  mongoose.connection.close()
});

country.create(count, (err) => {
  if (err) { throw (err) }
  mongoose.connection.close()
});

about.create(data, (err) => {
  if (err) { throw (err) }
  mongoose.connection.close()
});

browser.create(browserData, (err) => {
  if (err) { throw (err) }
  mongoose.connection.close()
});

users.create(userdata, (err) => {
  if (err) { throw (err) }
  mongoose.connection.close()
});