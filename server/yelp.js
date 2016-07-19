///////////////////////////
///// YELP NPM
//////////////////////////
var Yelp = require('yelp');
var yelpdb = [];
var yelp = new Yelp({
  consumer_key: '...',
  consumer_secret: '...',
  token: '...',
  token_secret: '...',
});

// See http://www.yelp.com/developers/documentation/v2/search_api
yelp.search({ term: 'pokestop', location: 'San Francisco' })
.then(function (data) {
  var yb = data.businesses;
  yelpdb.push(yb);
  console.log(yelpdb);
})
.catch(function (err) {
  console.error(err);
});

module.exports = yelpdb;
//////////////////////////
//// END YELP
/////////////////////////
