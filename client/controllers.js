////////////////////////
//// GOOGLE MAPS
////////////////////////
angular.module("myApp").controller("mapController", function($scope, $http, $interval, uiGmapGoogleMapApi) {

  var pokeBall = {
    url: 'http://vignette2.wikia.nocookie.net/pokemon/images/1/13/Poke_Ball_Sprite.png/revision/20151205192135'
  }

  $http.get('http://localhost:3000/api')
    .then(function(response){
      $scope.pokestops = response.data[0];
      for(var i =0; i < $scope.pokestops.length; i++){
        var templat = $scope.pokestops[i].location.coordinate.latitude;
        var templng = $scope.pokestops[i].location.coordinate.longitude;
        var id = $scope.pokestops[i].id;
        var marker = {
          id: id,
          icon: pokeBall,
          coords: {latitude: templat, longitude: templng}
        }
        $scope.map.markers.push(marker)
      }
    })
    // var markers = [{latitude: 37.773972, longitude: -122.431297}]
  $scope.map={
    center: {
      latitude: 37.773972,
      longitude: -122.431297
    },
    zoom: 12,
    bounds: {},
    markers: [],
    events: {
      click: function (map, eventName, originalEventArgs){
        var e = originalEventArgs[0];
        var lat = e.latLng.lat();
        var lon = e.latLng.lng();
        var marker = {
          id: Date.now(),
          icon: pokeBall,
          coords: {
            latitude: lat,
            longitude: lon
          },
           options: {
             labelContent : 'HI BEN',
             labelAnchor: "16 33",
             labelClass: 'labelClass',
             labelStyle: {opacity: 0.75}
           }
        };
        $scope.map.markers.push(marker);
        console.log(marker);
        $scope.$apply();
      }
    }
  }
});

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
