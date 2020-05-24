const mongoose = require('mongoose');
const Stats = require('../models/homePageViews');
const about = require('../models/aboutPageViews');

mongoose.connect('mongodb://localhost:27017/Stat', { useNewUrlParser: true, useUnifiedTopology: true });

let data = {
  "name": "counter",
  "count": 0,
};

Stats.create(data, (err) => {
  if (err) { throw (err) }
  mongoose.connection.close()
});

about.create(data, (err) => {
  if (err) { throw (err) }
  mongoose.connection.close()
});
