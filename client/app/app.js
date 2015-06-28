'use strict';

var mm3App = angular.module('mm3UiApp', [
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
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider.otherwise({
      redirectTo: '/'
    });
    $locationProvider.html5Mode(true);

  }).factory('webSocket', function (socketFactory) {
    var factory = socketFactory();
    factory.forward('error');
    return factory;
  });

mm3App.controller('TabsCtrl', function ($scope, $location) {

  $scope.tabs = [
    {link: '#/', label: 'Main'},
    {link: '#/capture', label: 'Capture'}
  ];

  $scope.selectedTab = $scope.tabs[0];
  $scope.setSelectedTab = function (tab) {
    $scope.selectedTab = tab;
  };

  $scope.tabClass = function (tab) {
    if ($scope.selectedTab == tab) {
      return "active";
    } else {
      return "";
    }
  };
});
