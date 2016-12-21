/**
 * Created by banana.cao on 12/20/2016.
 */
/*Use anjularjs to achieve the handover between the pages*/
var app = angular.module('myApp', ['ngRoute']);
app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when("/login", {
        templateUrl: "login.html",
    }).when("/dashboard",{
        templateUrl:"dashboard.html",
    }).when("/user",{
        templateUrl:"user.html",
    }).otherwise({redirectTo:"/login"});

}]);
