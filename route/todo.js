/**
 * Created by Administrator on 2016/12/20.
 */
var app = angular.module('myApp', ['ui.router'])
    .config(
        function todoRoute($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/login')
            $stateProvider.state('index', {
                abstract: true,
                url: '/index',
                templateUrl: '../index.html',
            }).state('index.login', {
                url: '/login',
                templateUrl: '../login_register.html',
            }).state('main', {
                url: '/main',
                templateUrl: '../view/main.html',
            })
            /*.state('main.dashboard', {
             url: '/dashboard',
             templateUrl: '../view/dashboard.html',
             }).state('main.user', {
             url: '/user',
             templateUrl: '../view/user_management.html',
             })*/
        }
    );