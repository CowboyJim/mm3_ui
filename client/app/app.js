'use strict';

angular.module('mm3UiApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'ui.bootstrap',
    'nvd3ChartDirectives',
    'btford.socket-io',
    'frapontillo.bootstrap-switch',
    'ngTable',
    'ngHandsontable'
  ])
  .config(function($routeProvider, $locationProvider) {
    $routeProvider.otherwise({
      redirectTo: '/'
    });
    $locationProvider.html5Mode(true);

  }).factory('webSocket', function(socketFactory) {
    var factory = socketFactory();
    factory.forward('error');
    return factory;
  });