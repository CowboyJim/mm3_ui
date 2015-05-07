'use strict';

angular.module('mm3UiApp')
  .controller('MainCtrl', function ($scope, $http, $log, webSocket) {
    $scope.awesomeThings = [];
    $http.get('/api/things').success(function (awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });

    $scope.log_messages = "Now is the time for all good men to come to the aid of their country";
    $scope.log_messages += "\nThis should be a new line";

    webSocket.connect();

    var commConnected = false;
    $scope.comConnectState = 'disconnect';

    $scope.connectToComPort = function (connect) {

      if (commConnected !== connect) {
        $log.debug("Changing Comm Port state to: " + $scope.comConnectState);
        commConnected = connect;

        if (connect) {
          $scope.comConnectState = 'connect';
          webSocket.emit('connectComm', {state: 'connect'});
        } else {
          $scope.comConnectState = 'disconnect';
          webSocket.emit('disconnectComm', {state: 'disconnect'});
        }
      }

    };

    $scope.exampleData = [
      {
        "key": "left",
        "color": "#d62728",
        "values": [
          ["38", -10],
          ["30", -144],
          ["24", -180],
          ["19", -200],
          ["G5", -255],
          ["G6", -255],
          ["G7", -200],
          ["G8", -180],
          ["G9", -144],
          ["G10", -140],
          ["G11", -170],
          ["G12", -150],
          ["G13", -110],
          ["G14", -50],
          ["G15", -10]
        ]
      },
      {
        "key": "right",
        "color": "#1f77b4",
        "values": [
          ["38", 10],
          ["30", 144],
          ["24", 180],
          ["19", 200],
          ["G5", 255],
          ["G6", 255],
          ["G7", 200],
          ["G8", 180],
          ["G9", 144],
          ["G10", 140],
          ["G11", 170],
          ["G12", 150],
          ["G13", 110],
          ["G14", 50],
          ["G15", 10]
        ]
      }
    ];

  });
