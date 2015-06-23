'use strict';

describe('Controller: CaptureCtrl', function () {

  // load the controller's module
  beforeEach(module('mm3UiApp'));

  var CaptureCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CaptureCtrl = $controller('CaptureCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
