/**
 * Created by beck.zhang on 12/16/2016.
 */

var app = angular.module('myApp',[]);
app.controller('myCtrl',function ($scope) {
  $scope.isHide = true;
  $scope.isShow = true;
  $scope.show1 = true;
  $scope.show2 = false;

  $scope.initSatus = false;
  $scope.incomplete = false;

  $scope.login = function () {
    $scope.initSatus = true;
    $scope.incomplete = true;
  };
  $scope.switch = function (id) {
    switch (id){
      case 0:
        $scope.initSatus = false;
        $scope.incomplete = false;
        break;
      case 1:
        $scope.incomplete = true;
        $scope.show1 = true;
        $scope.show2 = false;
        break;
      case 2:
        $scope.incomplete = true;
        $scope.show1 = false;
        $scope.show2 = true;
        break;
    }



  }

});