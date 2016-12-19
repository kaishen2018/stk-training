/**
 * Created by beck.zhang on 12/19/2016.
 */

function myroute($stateProvide, $urlRouterProvide) {
  $urlRouterProvide.otherwise('/home');

  $stateProvide
      .state('/home',{
        url:"/home",
        templateUrl:__dirname + "/home.html",
        controller:function ($scope) {
          console.log("enter home");
        }
      })
}