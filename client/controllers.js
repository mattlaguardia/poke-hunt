////////////////////////
//// GOOGLE MAPS
////////////////////////
angular.module("myApp").controller("mapController", function($scope, $http, $interval, uiGmapGoogleMapApi) {

  $scope.text = '';

  var pokeBall = {
    url: 'http://vignette2.wikia.nocookie.net/pokemon/images/1/13/Poke_Ball_Sprite.png/revision/20151205192135'
  }
  var pokeStop = {url: "https://ucarecdn.com/7e2ebe0a-cfe6-470b-b2fd-c474f124b0c4/pokestopnew.png"}
//////////////////////////
//// AJAX TO VARIABLE
//////////////////////////
  $http.get('http://localhost:3000/api')
    .then(function(response){
      $scope.pokestops = response.data[0];
      console.log($scope.pokestops)

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
      model: {},
      show: false,
      options: {}
    },
    markers: [],
    markersEvents: {
      click: function(markers, eventName, model, args){
        console.log("Click Marker Clicked");
        $scope.map.window.model = model;
        $scope.map.window.show = true;
      }
    },
    options: {},
    events: {
      click: function (map, eventName, originalEventArgs){
        var e = originalEventArgs[0];
        var lat = e.latLng.lat();
        var lon = e.latLng.lng();
        var marker = {
          id: Date.now(),
          icon: pokeBall,
          latitude: lat,
          longitude: lon,
          title: "Hi Ben"
        };
        $scope.map.markers.push(marker);
        console.log(marker);
        $scope.$apply();
      }
    }
  }
})
.controller('templateController', function(){});
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
          $location.path('/login');
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
