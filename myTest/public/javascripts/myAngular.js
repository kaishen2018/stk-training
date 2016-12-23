/*
 * Created by banana.cao on 12/20/2016.
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
    }).otherwise({redirectTo: "/"});

}]);

app.controller("myCtrl", function ($scope,$http) {
    $scope.formData = {};
    $http.get('/api/users')
        .success(function ( data) {
            $scope.users=data;
            console.log(data);
        })
        .error(function (err) {
            console.log('Error:',err);
        });
    $scope.user_add = function () {
        $http.post('/api/users', $scope.formData)
            .success(function (data) {
                $scope.formData = {};
                $scope.users = data;
                console.log(data)
            })
            .error(function (err) {
                console.log('Error :', err);
            });


    };



    // //ajax发送数据请求
    // $scope.url = window.location.href;
    // $scope({
    //     type: "POST",//传递方式
    //     url: $scope.url,   // 提交的页面
    //     data: {action:"select"}, //要传递的数据
    //     dataType: 'json'
    // }).success(function (data) {
    //     //处理返回结果，页面显示
    //     var json = eval(data);
    //     for (var i = 0; i < json.length; j++) {//扫描数组中的每个元素
    //
    //     }
    // });




/*var myDate = new Date();
 myDate.getYear();        //获取当前年份(2位)
 myDate.getFullYear();    //获取完整的年份(4位,1970-????)
 myDate.getMonth();       //获取当前月份(0-11,0代表1月)
 myDate.getDate();        //获取当前日(1-31)
$scope.users = [
    {Name: "banana cao1", CreateName: "banana cao", Date: "2016-12-21", Updates: "2016-12-21"},
    {Name: "banana cao2", CreateName: "banana cao", Date: "2016-12-21", Updates: "2016-12-21"},
    {Name: "banana cao3", CreateName: "banana cao", Date: "2016-12-21", Updates: "2016-12-21"},
    {Name: "banana cao4", CreateName: "banana cao", Date: "2016-12-21", Updates: "2016-12-21"}
];
$scope.addUser = function () {
    $scope.users.push({
        Name: $scope.newName,
        CreateName: $scope.newCreateName,
        Date: $scope.newDate,
        Update: $scope.newUpdate
    });
    $scope.newName = '';
    $scope.newCreateName = '';
    $scope.newDate = '';
    $scope.newUpdate = '';
};
$scope.deleteUser = function (index) {   //删除一行的内容

    var alert2 = document.getElementById("alert2");
    if (alert2.style.display == "none")
        alert2.style.display = "block";
    else
        alert2.style.display = "none";
    $scope.users.splice(index, 1);
};*/

});


