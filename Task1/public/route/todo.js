/**
 * Created by Administrator on 2016/12/20.
 */
function todoRoute($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/login');
    $stateProvider.state('login', {
        url: '/login',
        templateUrl: './view/login_register.html',
    }).state('main', {
        url: '/main',
        templateUrl: './view/main.html',
    }).state('main.dashboard', {
        url: '/dashboard',
        templateUrl: './view/dashboard.html',
    }).state('main.user', {
        url: '/user',
        templateUrl: './view/user_management.html',
    })
};
