// pokeball model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Pokeball = new Schema({
  id: String,
  latitude: Number,
  longitude: Number,
  title: String
});

Pokeball.plugin(passportLocalMongoose);

module.exports = mongoose.model('pokeballs', Pokeball);
