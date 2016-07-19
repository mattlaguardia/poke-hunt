////////////////////////
//// GOOGLE MAPS
////////////////////////
angular.module("myApp").controller("mapController", function($scope, $http, $interval, uiGmapGoogleMapApi) {
  var iconimg = {
        url: 'http://vignette2.wikia.nocookie.net/pokemon/images/1/13/Poke_Ball_Sprite.png/revision/20151205192135'
    }
  $scope.loadYelp = function(){
    $http.get('server/yelpdb')
      .success(function(response){
        console.log(response);
      })
  }

  angular.extend($scope, {
    map: {
      center: {
        latitude: 37.773972,
        longitude: -122.431297
      },
      zoom: 12,
      markers: [],
      events: {
        click: function (map, eventName, originalEventArgs){
          var e = originalEventArgs[0];
          var lat = e.latLng.lat();
          var lon = e.latLng.lng();
          var marker = {
            id: Date.now(),
            icon: iconimg,
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
          console.log($scope.map.markers);
          $scope.$apply();
        }
      }
    }
  })
});
//////////////////////
///// YELP
/////////////////////


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
