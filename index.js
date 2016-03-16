var myApp = angular.module('myApp', ['ui.router','ngAnimate', 'ui.bootstrap']);

myApp
.constant('_', window._)
.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');
    
    $stateProvider
        // HOME STATES 
        .state('home', {
            url: '/home',
            templateUrl: 'js/view/home.html',
            controller: 'costController'
        })
        
});

