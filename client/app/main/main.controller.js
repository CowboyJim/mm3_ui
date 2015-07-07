'use strict';

angular.module('mm3UiApp')
  .controller('MainCtrl', function ($scope, $http, $log, webSocket, ngTableParams) {

    $scope.$on('socket:barGraphData', function(ev, data){
      $scope.mm3BarGraphData = JSON.parse(data);
      $log.debug("MM3 Packet Received");

    });

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
