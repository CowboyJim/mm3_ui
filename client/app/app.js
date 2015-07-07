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
      redirectTo: '/capture'
    });
    $locationProvider.html5Mode(true);

  }).factory('webSocket', function (socketFactory) {
    var factory = socketFactory();
    factory.forward('channelData');
    factory.forward('barGraphData');
    return factory;
  });


mm3App.controller('AppCtrl', function ($rootScope, $scope, $http, $log, webSocket) {

  var defaultViewId = "/capture"
  $scope.currentRoute = defaultViewId;

  var packetListeners = {};
  var currentListenerKey = defaultViewId;

  $scope.config = {};
  $http.get('/api/config').success(function (config) {
    $scope.config = config;
  });

  $scope.log_messages = "Application initialization";

  // Connect to the web com socket
  webSocket.connect();



  $scope.connectToCom = 'connect';
  //webSocket.emit('connectComm', {state: 'connect'});

  $scope.hideAlert = true;

  /**
   * Method that will disconnect from the com port on the web socket
   */
  $scope.$watch('connectToCom', function () {
    if ($scope.connectToCom === 'connect') {
      $log.debug("Changing Comm Port state to: connect");
      webSocket.emit('connectComm', {state: 'connect'});
      //webSocket.addListener('alert', alertListener);
      $log.debug("Added websocket listener for event: mm3Packet");

    } else {
      webSocket.emit('disconnectComm', {state: 'disconnect'});
      //webSocket.removeListener(alertListener);
      $log.debug("Changing Comm Port state to: disconnect");
    }
  });

  /**
   *
   */
  $rootScope.$on('$routeChangeSuccess', function (e, current, previous) {
    if (typeof current === 'undefined' || typeof previous === 'undefined' || typeof previous.$$route === 'undefined') {
      return;
    }

    $scope.currentRoute = current.$$route.originalPath;
    var previousRoute = previous.$$route.originalPath;
    var listen;

    $log.debug("current route: " + $scope.currentRoute + " previous route: " + previousRoute);

    if (typeof previousRoute !== 'undefined') {
      listen = packetListeners[previousRoute];

      //webSocket.removeListener(listen.listener);
//      webSocket.removeAllListeners(listen.event);

  //    $log.debug("Removed listener: " + previousRoute);
    }

    if (typeof packetListeners[$scope.currentRoute] !== 'undefined') {
      //listen = packetListeners[$scope.currentRoute];
      //webSocket.addListener(listen.event, listen.listener);

      //$log.debug("Added listener: " + $scope.currentRoute);
    }
  });


  var alertListener = function (hideAlert) {
    $scope.hideAlert = hideAlert;
    $log.debug("Alert fired");
  };


});
