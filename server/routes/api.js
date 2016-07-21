var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var passport = require('passport');
var User = require('../models/user.js');
var Pokeball = require('../models/pins');


router.post('/register', function(req, res) {
  User.register(new User({ username: req.body.username }),
    req.body.password, function(err, account) {
    if (err) {
      return res.status(500).json({
        err: err
      });
    }
    passport.authenticate('local')(req, res, function () {
      return res.status(200).json({
        status: 'Registration successful!'
      });
    });
  });
});

router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({
        err: info
      });
    }
    req.logIn(user, function(err) {
      if (err) {
        return res.status(500).json({
          err: 'Could not log in user'
        });
      }
      res.status(200).json({
        status: 'Login successful!'
      });
    });
  })(req, res, next);
});

router.get('/logout', function(req, res) {
  req.logout();
  res.status(200).json({
    status: 'Bye!'
  });
});

router.get('/status', function(req, res) {
  if (!req.isAuthenticated()) {
    return res.status(200).json({
      status: false
    });
  }
  res.status(200).json({
    status: true
  });
});
///////////////////////
//// POKEBALL POST
///////////////////////
router.post('/pins', function(req, res){
    var pokeball = req.body;
    console.log(pokeball);

    var newPokeball = new Pokeball ({
      id: req.body.id,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      title: req.body.title
    })
    newPokeball.save(function(err){
      console.log("SAVED!!");
    })
  })

router.get('/pins', function(req, res){
  Pokeball.find().exec(function(err, pokeballs){
    if(err) { console.log("ERROR in GET /PINS api.js: " + err)}
    res.send(pokeballs)
  })
})


module.exports = router;
