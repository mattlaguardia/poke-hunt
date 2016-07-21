////////////////////////
//// GOOGLE MAPS
////////////////////////
angular.module("myApp").controller("mapController", function($scope, $http, $interval, uiGmapGoogleMapApi) {

  var pokeBall = {
    url: 'https://ucarecdn.com/93345d4b-8c33-4858-a855-40333eeb84c7/pokeball.png'
  }
  var pokeStop = {url: "https://ucarecdn.com/7e2ebe0a-cfe6-470b-b2fd-c474f124b0c4/pokestopnew.png"}

//////////////////////////
//// AJAX TO VARIABLE
//////////////////////////
  $http.get('http://localhost:3000/pins')
    .then(function(response){
      $scope.userpokestops = response.data;
      // console.log($scope.userpokestops);

      for(var i = 0; i < $scope.userpokestops.length; i++){
        var userTempLat = $scope.userpokestops[i].latitude;
        var userTempLng = $scope.userpokestops[i].longitude;
        var userTitle = $scope.userpokestops[i].title;
        var userId = $scope.userpokestops[i].id;
        var pokeball = {
          'id': userId,
          latitude: userTempLat,
          longitude: userTempLng,
          title: userTitle,
          icon: pokeBall
        }
        $scope.map.savedpokeballs.push(pokeball);
      }
    })
  $http.get('http://localhost:3000/api')
    .then(function(response){
      $scope.pokestops = response.data[0];
      // console.log($scope.pokestops)

      for(var i = 0; i < $scope.pokestops.length; i++){
        var templat = $scope.pokestops[i].location.coordinate.latitude;
        var templng = $scope.pokestops[i].location.coordinate.longitude;
        var id = $scope.pokestops[i].id;
        var name = $scope.pokestops[i].name;
        var location = $scope.pokestops[i].location.display_address[0]
        var marker = {
          'id': name,
          latitude: templat,
          longitude: templng,
          title: location,
          icon: pokeStop,
        }
        $scope.map.markers.push(marker);
      }
    })
  $scope.map={
    center: {
      latitude: 37.773972,
      longitude: -122.431297
    },
    control: {},
    zoom: 13,
    window: {
      show: false
    },
    markers: [],
    markersEvents: {
      click: function(markers, eventName, model, args){
        $scope.map.window.model = model;
        $scope.map.window.show = true;
      }
    },
    pokeballEvents: {
      click: function(pokeballs, eventName, model, args){
        $scope.map.window.pokeball = model;
        $scope.map.window.show = true;
      }
    },
    savedpokeballsEvents: {
      click: function(savedpokeballs, eventName, model, args){
        $scope.map.window.savedpokeballs = model;
        $scope.map.window.show = true;
      }
    },
    options: {},
    savedpokeballs: [],
    pokeballs: [],
    events: {
      click: function (map, eventName, originalEventArgs){
        var e = originalEventArgs[0];
        var lat = e.latLng.lat();
        var lon = e.latLng.lng();
        var marker = {
          id: "ID: " + Date.now(),
          icon: pokeBall,
          latitude: lat,
          longitude: lon,
          title: "Pokemon"
        };
        $scope.map.pokeballs.push(marker);
        $scope.$apply();
      }
    }
  }
})
.controller('templateController', function(){})

//////////////////////////
//// POKEBALL CONTROLLER
//////////////////////////
angular.module('myApp').controller('pokeballController', ["$scope", "$http", function($scope, $http){
  $scope.pokeball = 'Ben-Jammin-Puff';
  $scope.selection = true;
  $scope.newPokeball = {};

  $scope.addPokeball = function(){
    // console.log($scope.newPokeball);
    $scope.pokeball = $scope.newPokeball.title;
    $scope.parameter.latitude = $scope.newPokeball.latitude;
    $scope.parameter.longitude = $scope.newPokeball.longitude;
    // console.log($scope.newPokeball);

    $http.get('http://localhost:3000/pins')
    .success(function(response){
      $scope.pokeballs = response.data;
      // console.log("GET REQ from HTTP: " + response.data);
    })
    .error(function(err){
      console.log("ERROR in GET ANGULAR: " + err)
    })
    $http.post('http://localhost:3000/pins', $scope.newPokeball)
      .success(function(response){
        console.log("POSTED TO DB!");
      })
      .error(function(err){
        console.log("ERROR IS IN CONTROLLER.JS: " + err)
      })
  }
}]);


//////////////////////
//// LOGIN CTRL
//////////////////////
angular.module('myApp').controller('loginController',
  ['$scope', '$location', 'AuthService',
  function ($scope, $location, AuthService) {

    $scope.login = function () {
      // initial values
      $scope.error = false;
      $scope.disabled = true;

      // call login from service
      AuthService.login($scope.loginForm.username, $scope.loginForm.password)
        // handle success
        .then(function () {
          $location.path('/');
          $scope.disabled = false;
          $scope.loginForm = {};
        })
        // handle error
        .catch(function () {
          $scope.error = true;
          $scope.errorMessage = "Invalid username and/or password";
          $scope.disabled = false;
          $scope.loginForm = {};
        });

    };

}]);
//////////////////////
//// LOGOUT CTRL
//////////////////////
angular.module('myApp').controller('logoutController',
  ['$scope', '$location', 'AuthService',
  function ($scope, $location, AuthService) {

    $scope.logout = function () {

      // call logout from service
      AuthService.logout()
        .then(function () {
          $location.path('/login');
        });

    };

}]);
//////////////////////
//// REGISTER CTRL
//////////////////////
angular.module('myApp').controller('registerController',
  ['$scope', '$location', 'AuthService',
  function ($scope, $location, AuthService) {
    $scope.register = function () {
      // initial values
      $scope.error = false;
      $scope.disabled = true;

      // call register from service
      AuthService.register($scope.registerForm.username, $scope.registerForm.password)
        // handle success
        .then(function () {
          $location.path('/');
          $scope.disabled = false;
          $scope.registerForm = {};
        })
        // handle error
      .catch(function () {
        $scope.error = true;
        $scope.errorMessage = "Something went wrong!";
        $scope.disabled = false;
        $scope.registerForm = {};
      });
    };
}]);
