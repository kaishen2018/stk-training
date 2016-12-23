/**
 * Created by beck.zhang on 12/16/2016.
 */

var app = angular.module('myApp', ['ui.router']);
app.config(function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/index');
  $stateProvider
      .state('index', {
        url: "/index",
        templateUrl: "../../../views/home.html",
        controller: function ($scope) {
          console.log("enter index");
        }
        // controller: "HomeController",
        // controllerAs: "ctrHome"
      })
      .state('login', {
        url: '/pages',
        views: {
          "": {
            templateUrl: '../../../views/pageNav.html',
            controller: function ($scope) {
              console.log("login success");
            }
          },
          "pages": {
            templateUrl: "../../../views/page1.html",
            controller: function ($scope) {
              console.log("first enter page1");
            }
          }
        }
      })
      .state('page1', {
        url: '/page1',
        views: {
          "": {
            templateUrl: '../../../views/pageNav.html',
            controller: function ($scope) {
              console.log("login success");
            }
          },
          "pages": {
            templateUrl: "../../../views/page1.html",
            controller: function ($scope) {
              console.log("enter page1")
            }
          }
        }
      })
      .state('page2', {
        url: '/page2',
        views: {
          "": {
            templateUrl: '../../../views/pageNav.html',
            controller: function ($scope) {
              console.log("login success");

            }
          },
          pages: {
            templateUrl: '../../../views/page2.html',
            controller: function ($scope) {
              console.log("enter page2");
            }
          }
        }
      })
});

app.controller('myCtrl', function myCtrl($scope, $http, $state, $stateParams) {


  $scope.users = {};
  $scope.isshow = false;




  /*$scope.error = false;
  $scope.incomplete1 = false;
  $scope.incomplete2 = false;

  $scope.loginName = "";
  $scope.loginPwd = "";
  $scope.registerName = "";
  $scope.registerPwd = "";
  $scope.registerPwd2 = "";

  $scope.$watch("formData.loginName",function () {$scope.test1();});
  $scope.$watch("formData.loginPwd",function () {$scope.test1();});
  $scope.$watch("formData.registerName",function () {$scope.test2();});
  $scope.$watch("formData.registerPwd",function () {$scope.test2();});
  $scope.$watch("formData.registerPwd2",function () {$scope.test2();});
  $scope.test1 = function() {

    $scope.incomplete = false;
    if (!$formData.loginName.length ||
        !$formData.loginPwd.length ) {
      $scope.incomplete = true;
    }
  };
  $scope.test2 = function() {
    if ($formData.registerPwd !== $formData.registerPwd2) {
      $scope.error = true;
    } else {
      $scope.error = false;
    }
    $scope.incomplete = false;
    if (!$formData.registerName.length ||
        !$formData.registerPwd.length ||
        !$formData.registerPwd2.length) {
      $scope.incomplete = true;
    }
  };*/



  $scope.loginIn = function () {
    $scope.isshow = true;
    $http.post("/api/index/login",$scope.formData)
        .success(function (data) {
          $scope.formData = {};
        })
        .error(function (err) {
          console.log("login error!");
        });
  };


  $scope.formData = {};

  $http.get('/api/index')
      .success(function (data) {
        console.log(data);
        $scope.users = data;
      })
      .error(function (err) {
        console.log('Error: ', err);
      });


  $scope.createUser = function () {
    console.log("-------> createUser");
    $http.post("/api/index", $scope.formData)
        .success(function (data) {
          $scope.formData = {};
          $scope.users = data;
          console.log(data);
        }).error(function (err) {
      console.log(err.stack);
    });
  };


  $scope.deleteUser = function (uid) {
    console.log("--------> delteUser");
    $http.delete('/api/index/' + uid)
        .success(function (data) {
          $scope.users = data;
        }).error(function (err) {
      console.log(err.stack);
    });
  };


  $scope.oneUser = {};

  console.log($scope.oneUser);

  $scope.editUser = function (uid) {
    $http.get('/api/index/' + uid)
        .success(function (data) {
          $scope.oneUser = data[0];
          console.log("$scope.oneUser", $scope.oneUser);
        }).error(function (err) {
      console.log(err.stack);
    });
  };

  $scope.saveUser = function () {
    $http.put('/api/index', $scope.oneUser)
        .success(function (data) {
          $scope.oneUser = {};
          $scope.users = data;
          console.log("$scope.users: ", $scope.users);
        })
        .error(function (err) {
          console.log(err.stack);
        });
  }
});






