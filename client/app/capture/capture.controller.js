'use strict';

angular.module('mm3UiApp')
  .controller('CaptureCtrl', function ($scope) {
    $scope.message = 'Hello';

 $scope.db = {};
//db.items = [];

        $scope.data = [
            {
                'name': 'Bob',
                'email': 'bob@sample.com'
            },
            {
                'name': 'John',
                'email': 'john@sample.com'
            }
        ];

  });
