/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

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



/***/ }
/******/ ]);