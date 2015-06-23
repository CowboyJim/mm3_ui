'use strict';

angular.module('mm3UiApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/capture', {
        templateUrl: 'app/capture/capture.html',
        controller: 'CaptureCtrl'
      });
  });
