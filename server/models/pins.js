// pokeball model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Pokeball = new Schema({
  id: String,
  latitude: Number,
  longitude: Number,
  title: String
});

module.exports = mongoose.model('pokeball', Pokeball);
