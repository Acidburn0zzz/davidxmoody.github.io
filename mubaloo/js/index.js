var app = angular.module('formApp', ['ngAnimate']);

app.controller('FormCtrl', function($scope, $http) {

  $scope.requestBinURL = 'http://requestb.in/1lxqzn71';

  // List of selectable titles
  $scope.titles = [
    'Mr',
    'Ms',
    'Mrs'
  ]

  // Storage for all submitted data
  $scope.user = {};

  // This stage number controls the active ng-switch element in index.html
  $scope.stage = 1;

  // Called upon submitting the first two stages of the form
  $scope.nextStage = function() {
    $scope.stage++;

    // If advancing to stage 2 then pre-fill the current datetime, saves the 
    // user from having to enter a new datetime if the current datetime is okay
    if ($scope.stage===2 && !$scope.user.currentDatetime) {
      var now = new Date();
      now.setSeconds(0);
      now.setMilliseconds(0);
      $scope.user.currentDatetime = now;
    }
  };

  // Called upon submitting form stage 3, sends data to requestb.in and
  // displays confirmation message with JSON data
  $scope.submit = function() {
    $scope.nextStage();
    console.log($scope.user);

    // Needs to be sent with the following Content-Type to be picked up by
    // requestb.in properly
    // The response cannot be read because requestb.in does not send an
    // Access-Control-Allow-Origin header, this is not a problem as the data
    // is still recieved by requestb.in without issue
    $http({
      method: 'post',
      url: $scope.requestBinURL,
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      data: $scope.user
    });
  };

  // Convenience function to pretty print JSON output in the confirmation stage
  $scope.getUserData = function() {
    return JSON.stringify($scope.user, null, 2);
  };

});
