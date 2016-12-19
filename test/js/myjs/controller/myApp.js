/**
 * Created by beck.zhang on 12/16/2016.
 */

var app = angular.module('myApp', ['ui.router']);
app.config(function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/home');

  $stateProvider
      .state('home', {
        url: "/home",
        templateUrl: "./home.html",
        controller:function ($scope) {
          console.log("enter home");
        }
        // controller: "HomeController",
        // controllerAs: "ctrHome"
      })
      .state('login', {
        url: '/pages',
        views: {
          "": {
            templateUrl: './pageNav.html',
            controller: function ($scope) {
              //$scope.$parent.ctrHome.isshow = true;
              console.log("login success");
            }
          },
          "pages": {
            templateUrl: "./page1.html",
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
            templateUrl: './pageNav.html',
            controller: function ($scope) {
              //$scope.$parent.ctrHome.isshow = true;
              console.log("login success");
            }
          },
          "pages": {
            templateUrl: "./page1.html",
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
            templateUrl: './pageNav.html',
            controller: function ($scope) {
              //$scope.$parent.ctrHome.isshow = true;
              console.log("login success");
            }
          },
          pages: {
            templateUrl: './page2.html',
            controller: function ($scope) {
              console.log("enter page2")
            }
          }
        }
      })

});

app.controller('myCtrl', function myCtrl($scope, $http, $state, $stateParams) {
  $scope.users = [
    {name: "Lemon Yang", admin: "Beck", date: "2016-12-13", lastDate: "2016-12-19"},
    {name: "Lemon Yang", admin: "Beck", date: "2016-12-13", lastDate: "2016-12-19"},
    {name: "Lemon Yang", admin: "Beck", date: "2016-12-13", lastDate: "2016-12-19"},
    {name: "Lemon Yang", admin: "Beck", date: "2016-12-13", lastDate: "2016-12-19"}
  ];

});






