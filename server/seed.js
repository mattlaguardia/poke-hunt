// Allows for some seed data to be added to

var db = require("./models/pins.js");

var pokeball_list = [
  {
    id: 1,
    latitude: 37.7749,
    longitude: -122.4194,
    title: "Hi Ben"
  },
  {
    id: 2,
    latitude: 37.700,
    longitude: -122.4122,
    title: "Hi Ben"
  }
]

db.Pokeball.remove({}, function(err, pokeballs){

  db.Pokeball.create(pokeball_list, function(err, pokeballs){
    if (err) { return console.log(err); }
    console.log("CREATED ", pokeballs.length, " POKEBALLS"),
    process.exit();
  })

})
