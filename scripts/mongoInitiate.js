const mongoose = require('mongoose');
const Stats = require('../models/stat');
const country = require('../models/country');


mongoose.connect('mongodb://localhost:27017/Stat',{ useNewUrlParser: true });

let data={
    "name" : "counter",
    "count" : 0,
};

let count = {
    "country": null
}

Stats.create(data, (err) => {
  if (err) { throw(err) }
  mongoose.connection.close()
});

country.create(count, (err) => {
    if (err) { throw(err) }
    mongoose.connection.close()
  });