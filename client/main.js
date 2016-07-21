var myApp = angular.module('myApp', ['ngRoute', 'uiGmapgoogle-maps']);

myApp.config(function (uiGmapGoogleMapApiProvider, $routeProvider) {
  uiGmapGoogleMapApiProvider.configure({
        key: '...',
        v: '3.20',
        libraries: 'weather,geometry,visualization'
    });

  $routeProvider
    .when('/', {
      templateUrl: 'partials/map.html',
      controller: 'mapController',
      access: {restricted: true}
    })
    .when('/login', {
      templateUrl: 'partials/login.html',
      controller: 'loginController',
      access: {restricted: false}
    })
    .when('/logout', {
      templateUrl: 'partials/logout.html',
      controller: 'logoutController',
      access: {restricted: true}
    })
    .when('/register', {
      templateUrl: 'partials/register.html',
      controller: 'registerController',
      access: {restricted: false}
    })
    .when('/home', {
      templateUrl: 'partials/home.html',
      access: {restricted: true}
    })
    .otherwise({
      redirectTo: '/'
    });
});

myApp.run(function ($rootScope, $location, $route, AuthService) {
  $rootScope.$on('$routeChangeStart',
    function (event, next, current) {
      AuthService.getUserStatus()
      .then(function(){
        if (next.access.restricted && !AuthService.isLoggedIn()){
          $location.path('/login');
          $route.reload();
        }
      });
  });
});
