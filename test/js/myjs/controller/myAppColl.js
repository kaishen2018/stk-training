/**
 * Created by beck.zhang on 12/16/2016.
 */

var app = angular.module('myApp',[]);
app.controller('myCtrl',function ($scope) {
  $scope.ishide = true;
  $scope.isshow = true;
  $scope.error = false;
  $scope.incomplete = false;
});