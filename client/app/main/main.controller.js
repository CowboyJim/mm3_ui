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
    $scope.mm3Packet = undefined;

    var mm3PacketListener = function (data) {
      $scope.mm3Packet = data;
      $log.debug("MM3 Packet Received");
      $log.debug(JSON.stringify(data));
    };

    $scope.connectToComPort = function (connect) {

      if (commConnected !== connect) {
        commConnected = connect;

        if (connect) {
          $scope.comConnectState = 'connect';
          $log.debug("Changing Comm Port state to: connect");
          webSocket.emit('connectComm', {state: 'connect'});
          webSocket.addListener('mm3Packet', mm3PacketListener);
          $log.debug("Added websocket listener for event: mm3Packet");

        } else {
          $scope.comConnectState = 'disconnect';
          webSocket.emit('disconnectComm', {state: 'disconnect'});
          webSocket.removeListener(mm3PacketListener);
          $log.debug("Changing Comm Port state to: disconnect");
        }
      }

    };
  });
