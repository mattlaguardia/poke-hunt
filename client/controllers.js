angular.module("myApp").controller("Example", function($scope, $interval, uiGmapGoogleMapApi) {
  $scope.map = {
    center: {
      latitude: 56.162939,
      longitude: 10.203921
    },
    zoom: 8
  };
  uiGmapGoogleMapApi.then(function(maps) {
  });
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

// angular.module('myApp', []).
// directive('myMap', function() {
//     // directive link function
//     var link = function(scope, element, attrs) {
//         var map, infoWindow;
//         var markers = [];
//
//         // map config
//         var mapOptions = {
//             center: new google.maps.LatLng(50, 2),
//             zoom: 4,
//             mapTypeId: google.maps.MapTypeId.ROADMAP,
//             scrollwheel: false
//         };
//
//         // init the map
//         function initMap() {
//             if (map === void 0) {
//                 map = new google.maps.Map(element[0], mapOptions);
//             }
//         }
//
//         // place a marker
//         function setMarker(map, position, title, content) {
//             var marker;
//             var markerOptions = {
//                 position: position,
//                 map: map,
//                 title: title,
//                 icon: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png'
//             };
//
//             marker = new google.maps.Marker(markerOptions);
//             markers.push(marker); // add marker to array
//
//             google.maps.event.addListener(marker, 'click', function () {
//                 // close window if not undefined
//                 if (infoWindow !== void 0) {
//                     infoWindow.close();
//                 }
//                 // create new window
//                 var infoWindowOptions = {
//                     content: content
//                 };
//                 infoWindow = new google.maps.InfoWindow(infoWindowOptions);
//                 infoWindow.open(map, marker);
//             });
//         }
//
//         // show the map and place some markers
//         initMap();
//
//         setMarker(map, new google.maps.LatLng(51.508515, -0.125487), 'London', 'Just some content');
//         setMarker(map, new google.maps.LatLng(52.370216, 4.895168), 'Amsterdam', 'More content');
//         setMarker(map, new google.maps.LatLng(48.856614, 2.352222), 'Paris', 'Text here');
//     };
//
//     return {
//         restrict: 'A',
//         template: '<div id="gmaps"></div>',
//         replace: true,
//         link: link
//     };
// });
