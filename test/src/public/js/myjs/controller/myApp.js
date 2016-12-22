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
        controller:function ($scope) {
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

    // var chUsers = users;
    //
    // console.log(chUsers.length);
    // for (var i=0;i < chUsers.length; i++){
    //   console.log(chUsers[i].uName);
    // }
  };


  $scope.formData= {};
  $http.get('/api/index')
    .success(function (data) {
      console.log( data);
      $scope.users = data;
    })
    .error(function (err) {
      console.log('Error: ',err);
    });

  // $scope.updateUser = function(user){
  //   var uindex = users.indexOf(user);
  //   console.log(uindex);
  //   $scope.usersta = !user.$edit;
  // }

  $scope.createUser = function () {
    console.log("-------> createUser");
    $http.post("/api/index",$scope.formData)
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
    $http.delete('/api/index/'+uid)
      .success(function (data) {
        $scope.users = data;
      }).error(function (err) {
        console.log(err.stack);
    });
  };
  $scope.updateUser =function (user) {
    console.log('---------> updateUser'+ user);
    var uid = user.uid;
    $http.put('/api/index',uid)
      .success(function (data) {
        $scope.users = data;
      })
      .error(function (err) {

    });
  }

});






