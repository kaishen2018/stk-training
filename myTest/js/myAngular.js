/**
 * Created by banana.cao on 12/20/2016.
 */
/*Use anjularjs to achieve the handover between the pages*/
var app = angular.module('myApp', ['ngRoute']);
app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when("/login", {
        templateUrl: "login.html"
    }).when("/dashboard",{
        templateUrl:"dashboard.html"
    }).when("/user",{
        templateUrl:"user.html"
    }).otherwise({redirectTo:"/login"});

}]);

app.controller("myCtrl",function ($scope) {
    $scope.users=[
        {Name:"banana cao1",CreateName:"banana cao",Date:"2016-12-21",Update:"2016-12-21"},
        {Name:"banana cao2",CreateName:"banana cao",Date:"2016-12-21",Update:"2016-12-21"},
        {Name:"banana cao3",CreateName:"banana cao",Date:"2016-12-21",Update:"2016-12-21"},
        {Name:"banana cao4",CreateName:"banana cao",Date:"2016-12-21",Update:"2016-12-21"}
    ];
    $scope.addUser=function () {
        $scope.users.push({
            Name:$scope.newName,
            CreateName:$scope.newCreateName,
            Date:$scope.newDate,
            Update:$scope.newUpdate
        });
        $scope.newName='';
        $scope.newCreateName='';
        $scope.newDate='';
        $scope.newUpdate='';
    };
    $scope.deleteUser=function(index) {   //删除一行的内容

        var alert2 = document.getElementById("alert2");
        if (alert2.style.display == "none")
            alert2.style.display = "block";
        else
            alert2.style.display = "none";
            $scope.users.splice(index, 1);
    };
});





















