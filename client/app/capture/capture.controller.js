'use strict';

angular.module('mm3UiApp')
  .controller('CaptureCtrl', function ($scope, $log, webSocket, $modal) {

    var labelValues = ['0.75', '1.5', '3', '4.5', '6', '7.5', '9', '10.5', '12.5', '15', '19', '24', '30', '38'];

    var isListenening = false;

    $scope.$on('socket:channelData', function (ev, data) {
      if ($scope.capturing === true) {
        $scope.data.push(JSON.parse(data));
        //$log.debug($scope.data);
        $log.debug("Channel data received");
      }
    });

    // Capture flags
    $scope.capturing = false;
    var lastCaptureState = false;

    $scope.notCapturing = !$scope.capturing;

    $scope.capturePanelCss = "panel panel-success";
    initSpreasheet();

    $scope.$watch('capturing', function () {

      if ($scope.capturing !== lastCaptureState) {
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
      $scope.data.length = 1;
      $log.debug("entered clearData");
    };

    $scope.saveData = function () {
      var modalInstance = $modal.open({
        animation: true,
        templateUrl: 'captureModalContent.html',
        controller: 'CaptureModalCtrl',
        resolve: {
          items: function () {
            return $scope.items;
          }
        }
      });

      modalInstance.result.then(function (selectedItem) {
        $scope.selected = selectedItem;
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });

      $scope.toggleAnimation = function () {
        $scope.animationsEnabled = !$scope.animationsEnabled;
      };


      $log.debug("entered saveData");

    };

    // Initial data heading
    function initSpreasheet() {
      $scope.data = [getHeading()];
    }

    $scope.items = ['item1', 'item2', 'item3'];

  });

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.
/**
 *
 */
  angular.module('mm3UiApp').controller('CaptureModalCtrl', function ($scope, $modalInstance, items) {

    $scope.items = items;
    $scope.selected = {
      item: $scope.items[0]
    };

    $scope.ok = function () {
      $modalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  });
