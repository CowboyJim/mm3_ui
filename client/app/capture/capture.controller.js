'use strict';

angular.module('mm3UiApp')
  .controller('CaptureCtrl', function ($scope, $log, webSocket) {

    var labelValues = ['0.75', '1.5', '3', '4.5', '6', '7.5', '9', '10.5', '12.5', '15', '19', '24', '30', '38'];

    // Capture flags
    $scope.capturing = false;
    var lastCaptureState = false;

    $scope.notCapturing = !$scope.capturing;

    $scope.capturePanelCss = "panel panel-success";
    initSpreasheet();

    $scope.$watch('capturing', function () {

      if ($scope.capturing !== lastCaptureState) {
        if ($scope.capturing === true) {
          $log.debug("channelData listener added");
          webSocket.addListener('channelData', channelDataListener);

        } else {
          $log.debug("channelData listener removed");
          webSocket.removeListener('channelData', channelDataListener);
        }
        lastCaptureState = $scope.capturing;
      }
    });

    function getHeading() {
      var heading = [];
      heading.push('Seq');
      heading.push('EmgL');
      Array.prototype.push.apply(heading, labelValues);
      heading.push('EmgR');
      Array.prototype.push.apply(heading, labelValues);
      return heading

    }

    function toggleCapture() {
      if ($scope.capturing === false) {
        $scope.startCapture();
      } else {
        $scope.stopCapture();
      }
    }

    $scope.handleKeypress = function (keyEvent) {
      if (keyEvent.which === 32) {
        toggleCapture();
      }
    };

    $scope.startCapture = function () {
      $log.debug("entered startCapture");
      $scope.capturing = true;
      $scope.capturePanelCss = "panel panel-danger";
    };

    $scope.stopCapture = function () {
      $log.debug("entered stopCapture");
      $scope.capturing = false;
      $scope.capturePanelCss = "panel panel-success";

      // Add blank line after stopping
      $scope.data.push(new Array(31).join('0').split(''));

    };

    $scope.clearData = function () {
      initSpreasheet();
      $("#spreadsheet").handsontable('clear');
      $log.debug("entered clearData");
    };

    $scope.saveData = function () {
      $log.debug("entered saveData");
    };

    // Initial data heading
    function initSpreasheet() {
      $scope.data = [getHeading()];
    }

    /**
     *
     * @param data
     */
    var channelDataListener = function (data) {
      $scope.data.push(JSON.parse(data));
      $log.debug($scope.data);

      $log.debug("Channel data received");
    };

  });
