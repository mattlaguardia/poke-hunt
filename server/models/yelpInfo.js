var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PokeStop = new Schema({
  yelp: Array,
  date: { type: Date, default: Date.now }
})

module.exports = mongoose.model('pokestop', PokeStop);
