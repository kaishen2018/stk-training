var app = angular.module('myApp', ['ui.router']);
app.config(todoRoute);
app.controller('userTable', userTable);
