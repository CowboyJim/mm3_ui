'use strict';

angular.module('mm3UiApp')
  .controller('MainCtrl', function ($scope, $http, $log, webSocket, ngTableParams) {
    $scope.config = {};
    $http.get('/api/config').success(function (config) {
      $scope.config = config;
    });

    $scope.log_messages = "Application initialization";

    webSocket.connect();

    $scope.connectToCom = false;
    $scope.hideAlert = true;

    $scope.$watch('connectToCom', function () {
      if ($scope.connectToCom === 'connect') {
        $log.debug("Changing Comm Port state to: connect");
        webSocket.emit('connectComm', {state: 'connect'});
        webSocket.addListener('mm3Packet', mm3PacketListener);
        webSocket.addListener('alert', alertListener);
        $log.debug("Added websocket listener for event: mm3Packet");

      } else {
        webSocket.emit('disconnectComm', {state: 'disconnect'});
        webSocket.removeListener(mm3PacketListener);
        webSocket.removeListener(alertListener);
        $log.debug("Changing Comm Port state to: disconnect");
      }
    });

    var mm3PacketListener = function (data) {
      $scope.mm3BarGraphData = JSON.parse(data);
      $log.debug("MM3 Packet Received");
    };

    var alertListener = function(hideAlert){
       $scope.hideAlert = hideAlert;
       $log.debug("Alert fired");
    }


    /*  Define initial data for bar graph */
    var init = [['EMG', 0], ['0.75', 0], ['1.5', 0], ['3', 0], ['4.5', 0], ['6', 0], ['7.5', 0], ['9', 0], ['10.5', 0], ['12.5', 0], ['15', 0], ['19', 0], ['24', 0], ['30', 0], ['38', 0]].reverse();
    $scope.mm3BarGraphData = [
      {
        "key": "left",
        "color": "#d62728",
        "values": init
      },
      {
        "key": "right",
        "color": "#1f77b4",
        "values": init
      }
    ];

    /*  Define initial data for file list */
    var data = [
      {name: "Moroni", date: new Date(), size: 1000},
      {name: "Tiancum", date: new Date(), size: 1000},
      {name: "Jacob", date: new Date(), size: 1000},
      {name: "Nephi", date: new Date(), size: 1000},
      {name: "Enos", date: new Date(), size: 1000}
    ];

    $scope.tableParams = new ngTableParams({
      page: 1,
      count: 10
    }, {
      total: data.length,
      getData: function ($defer, params) {
        $defer.resolve(data.slice((params.page() - 1) * params.count(), params.page() * params.count()));
      }
    });

  });
