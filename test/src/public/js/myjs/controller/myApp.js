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

  $scope.error = false;
  $scope.incomplete1 = false;
  $scope.incomplete2 = false;

  $scope.totalUser = 0;
  $scope.oldUser = 0;
  $scope.newUser = 0;

  $scope.showDashboard = function () {
    $http.get("/api/index/showDashboard")
        .success(function (data) {
          var oldUserToal = invalidateDate(data);
          var num = data.length;
          console.log(oldUserToal, num);
          $scope.totalUser = num;
          $scope.oldUser = oldUserToal;
          $scope.newUser = num - oldUserToal;
          console.log($scope.totalUser,$scope.oldUser,$scope.newUser);
        })
        .error(function (err) {

        });
  };
  function invalidateDate(data) {
    var oldUserToal = 0;
    var currentDate = Date.now();
    var dateCom ="";
    var month ;
    for (var i = 0; i < data.length; i++) {
      console.log(data[i].uDate.slice(5, 7));
      month = data[i].uDate.slice(5, 7);
      switch (month) {
        case "1":
          month = "Jan";
          dateCom = month + " " + data[i].uDate.slice(8, 10) + ", " + data[i].uDate.slice(0, 4);
          break;
        case "2":
          month = "Feb";
          dateCom = month + " " + data[i].uDate.slice(8, 10) + ", " + data[i].uDate.slice(0, 4);
          break;
        case "3":
          month = "Mar";
          dateCom = month + " " + data[i].uDate.slice(8, 10) + ", " + data[i].uDate.slice(0, 4);
          break;
        case "4":
          month = "April";
          dateCom = month + " " + data[i].uDate.slice(8, 10) + ", " + data[i].uDate.slice(0, 4);
          break;
        case "5":
          month = "May";
          dateCom = month + " " + data[i].uDate.slice(8, 10) + ", " + data[i].uDate.slice(0, 4);
          break;
        case "6":
          month = "Jun";
          dateCom = month + " " + data[i].uDate.slice(8, 10) + ", " + data[i].uDate.slice(0, 4);
          break;
        case "7":
          month = "Jul";
          dateCom = month + " " + data[i].uDate.slice(8, 10) + ", " + data[i].uDate.slice(0, 4);
          break;
        case "8":
          month = "Aug";
          dateCom = month + " " + data[i].uDate.slice(8, 10) + ", " + data[i].uDate.slice(0, 4);
          break;
        case "9":
          month = "Sep";
          dateCom = month + " " + data[i].uDate.slice(8, 10) + ", " + data[i].uDate.slice(0, 4);
          break;
        case "10":
          month = "Oct";
          dateCom = month + " " + data[i].uDate.slice(8, 10) + ", " + data[i].uDate.slice(0, 4);
          break;
        case "11":
          month = "Nov";
          dateCom = month + " " + data[i].uDate.slice(8, 10) + ", " + data[i].uDate.slice(0, 4);
          break;
        case "12":
          month = "Dec";
          dateCom = month + " " + data[i].uDate.slice(8, 10) + ", " + data[i].uDate.slice(0, 4);
          break;
      }
      console.log(dateCom);
      var userDate = Date.parse(dateCom);
      var cha = Date.now() - userDate;
      if (cha > 24 * 60 * 60 * 1000) {
        oldUserToal++;
      }
    }
    return oldUserToal;
  }


  $scope.loginIn = function () {
    $http.post("/api/index/login", $scope.formData)
        .success(function (data) {
          console.log("receive", data);
          console.log(data);

          if (data[0].adminCount > 0) {
            $state.go("login");
            $scope.isshow = true;

          } else {
            $state.go('index');
            $scope.isshow = false;
            console.log(data);
            alert("登录失败,用户名或密码错误，重新输入！");
          }
        })
        .error(function (err) {
          console.log("login error!");
        });
  };

  $scope.registerAdmin = function () {
    $http.post("/api/index/register", $scope.formData)
        .success(function (data) {
          $scope.formData = {};
          $state.go("index");
          alert("恭喜你，注册成功！");
        })
        .error(function (err) {
          alert("注册失败，请重新注册!");
        })
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






