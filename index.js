var myApp = angular.module('myApp', ['ui.router','ngAnimate', 'ui.bootstrap']);

myApp
.constant('_', window._)
.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');
    
    $stateProvider
        // HOME  
        .state('home', {
            url: '/home',
            templateUrl: 'js/view/home.html',
            controller: 'costController'
        })
        //Login PAGE
        .state('login', {
            url: '/login',
            templateUrl: 'js/view/login.html',
            controller: 'loginController'
        })
        .state('register', {
            url: '/register',
            templateUrl: 'js/view/register.html',
            controller: 'registerController'
        })
        .state('main', {
            url: '/main',
            templateUrl: 'js/view/main.html',
            controller: 'mainController',
            data: {
                authorization: true,
                redirectTo: 'login',    
            }
        })
        .state('main.new', {
        url: '/newevent',
        templateUrl: 'js/view/newEvent.html',
        controller: 'newEventController'
        });
})
.run(function(_,$rootScope, $state, Authorization) {
  $rootScope._ = window._;
  $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
    if (!Authorization.authorized) {
      if (Authorization.memorizedState && (!_.has(fromState, 'data.redirectTo') || toState.name !== fromState.data.redirectTo)) {
        Authorization.clear();
      }
      if (_.has(toState, 'data.authorization') && _.has(toState, 'data.redirectTo')) {
        if (_.has(toState, 'data.memory')) {
          Authorization.memorizedState = toState.name;
        }
        $state.go(toState.data.redirectTo);
      }
    }

  });
});

