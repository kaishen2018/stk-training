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

  $scope.cout = 0;

  $scope.users = {};
  $scope.isshow = false;
  $scope.username = "";
  $scope.userpwd = "";

  $scope.loginIn = function () {
    $scope.isshow = true;

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






