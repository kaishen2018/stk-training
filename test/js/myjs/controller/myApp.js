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
              console.log("login success");
            }
          },
          pages: {
            templateUrl: './page2.html',
            controller: function ($scope) {
              console.log("enter page2");


            }
          }
        }
      })

});

app.controller('myCtrl', function myCtrl($scope, $http, $state, $stateParams) {

  $scope.cout = 0;

  $scope.users = [
    {name: "Lemon Yang", admin: "Beck", date: "2016-12-13", lastDate: "2016-12-19"},
    {name: "Lemon Yang", admin: "Beck", date: "2016-12-13", lastDate: "2016-12-19"},
    {name: "Lemon Yang", admin: "Beck", date: "2016-12-13", lastDate: "2016-12-19"},
    {name: "Lemon Yang", admin: "Beck", date: "2016-12-13", lastDate: "2016-12-19"}
  ];
  $scope.isshow = false;
  $scope.loginIn = function () {
    $scope.isshow = true;
  };


  $scope.edit = function (id) {
    var eid = $scope.users.indexOf(id);
    console.log("click edit button"+eid);

    var sta = $("#user-table").find("tbody").find("tr").eq(eid).find("td");

    if (sta.eq(0).find("span").eq(0).text() == "Edit"){
      sta.eq(0).find("span").eq(0).text("Save");
      sta.eq(0).find("span").eq(1).text("Cancel");
      sta.nextAll().find("span").hide();
      sta.nextAll().find("input").show();
      console.log(sta.eq(0).find("span").eq(1).text());
    }else if(sta.eq(0).find("span").eq(0).text() == "Save"){
      sta.eq(0).find("span").eq(0).text("Edit");
      sta.eq(0).find("span").eq(1).text("Delete");
      sta.nextAll().find("span").show();
      sta.nextAll().find("input").hide();
    }else if(sta.eq(0).find("span").eq(1).text() == "Cancel"){
      sta.eq(0).find("span").eq(0).text("Edit");
      sta.eq(0).find("span").eq(1).text("Delete");
      sta.nextAll().find("span").show();
      sta.nextAll().find("input").hide();
    }

  };

});






