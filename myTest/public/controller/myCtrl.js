/*
 * Created by banana.cao on 12/23/2016.
 */
/*Use anjularjs to achieve the handover between the pages*/
var app = angular.module('myApp', ['ngRoute']);
app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when("/login", {
        templateUrl: "login.html"
    }).when("/dashboard", {
        templateUrl: "dashboard.html"
    }).when("/user", {
        templateUrl: "user.html"
    }).otherwise({redirectTo: "/login"});

}]);

app.controller("myCtrl", function ($scope,$http) {
    /*To display the total number of users*/
    $http.get('/user')
        .success(function (data)  {
            $scope.total=data;
            console.log(data);
        })
    /*To display the number of the new users*/


    /*To show data from the database*/
    $scope.formData = {};
    $http.get('/users')
        .success(function ( data) {
            $scope.users=data;
            console.log(data);
        })
        .error(function (err) {
            console.log('Error:',err);
        });

    /*To add user information*/
    $scope.user_add = function () {
        $http.post('/users', $scope.formData)
            .success(function (data) {
                $scope.formData = {};
                $scope.users = data;
                console.log(data);
            })
            .error(function (err) {
                console.log('Error :', err);
            });


    };

    /*To delete user information*/
    $scope.user_delete=function(uid){
        $http.delete('/users/'+uid)
            .success(function(data){
                 $scope.users = data;
                console.log(uid);
            })
            .error(function (err) {
                console.log('Error :', err);
            });
    };

    /*To edit user information*/
    $scope.userdata={};
    $scope.user_edit=function(uid){
        $http.put('/users/'+uid,$scope.userdata)//两个参数：1.url地址,2.传给路由的对象   put(url，data)
            .success(function(data){
                $scope.userdata={};
                $scope.users = data;
                console.log(data);
            })
            .error(function (err) {
                console.log('Error :', err);
            });
    };



    /*//ajax发送数据请求
     $scope.url = window.location.href;
     $scope({
     type: "POST",//传递方式
     url: $scope.url,   // 提交的页面
     data: {action:"select"}, //要传递的数据
     dataType: 'json'
     }).success(function (data) {
     //处理返回结果，页面显示
     var json = eval(data);
     for (var i = 0; i < json.length; j++) {//扫描数组中的每个元素

     }
     });*/

});