// dependencies
var express = require('express');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressSession = require('express-session');
var mongoose = require('mongoose');
var hash = require('bcrypt-nodejs');
var path = require('path');
var passport = require('passport');
var localStrategy = require('passport-local' ).Strategy;
var Yelp = require('yelp');

// mongoose
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://heroku_032mdhjd:d50j8merjoabgm2pfk4a31sjmt@ds027165.mlab.com:27165/heroku_032mdhjd');

// user schema/model
var User = require('./models/user.js');
var Pokeball = require('./models/pins.js');

// create instance of express
var app = express();
var routes = require('./routes/api.js');

// define middleware
app.use(express.static(path.join(__dirname, '../client')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

// configure passport
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// routes
app.use('/user/', routes);

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../client', 'index.html'));
});

app.get('/api', function(req, res) {
  var yb = [];
  var yelp = new Yelp({
    consumer_key: ENV["consumer_secret"],
    consumer_secret: ENV["consumer_secret"],
    token: ENV["token"],
    token_secret: ENV["token_secret"],
  });

  // See http://www.yelp.com/developers/documentation/v2/search_api
  yelp.search({ term: 'pokestop', location: 'San Francisco'})
  .then(function (data) {
    temp = data.businesses;
    yb.push(temp);
    console.log(yb);
    res.send(yb);
  })
  .catch(function (err) {
    console.error(err);
  });
});

app.get('/pins', function(req, res){
  Pokeball.find().exec(function(err, pokeballs){
    if(err) { console.log("ERROR in GET /PINS api.js: " + err)}
    res.send(pokeballs).json({
      status: true
    })
  })
})


app.post('/pins', function(req, res){
    var pokeball = req.body;
    console.log(pokeball);

    var newPokeball = new Pokeball ({
      id: req.body.id,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      title: req.body.title
    })
    newPokeball.save(function(err){
      if(err){
        console.log("ERROR: " + err);
      }
      res.send(newPokeball).json({
        status: true
      })
      console.log("SAVED!!");
    })
  })


var allowCrossDomain = function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    res.setHeader('Access-Control-Allow-Credentials', true);
    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};

app.use(allowCrossDomain);


module.exports = app;
