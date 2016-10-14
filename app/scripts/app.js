'use strict';

/**
 * @ngdoc overview
 * @name KidzFountainWebApp
 * @description
 * # KidzFountainWebApp
 *
 * Main module of the application.
 */
var KidzFountainWebApp = angular.module('KidzFountainWebApp', ['ngAnimate', 'ngAria','ngCookies','ngMessages','ngResource','ngRoute','ngSanitize','ngTouch'])

  KidzFountainWebApp.config(config).run(run);

  KidzFountainWebApp.directive('inputRestrictor', function () {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attr, ngModelCtrl) {
                // var pattern = /[^0-9A-Z !\\"#$%&'()*+,\-.\/:;<=>?@\[\]^_`{|}~]*/g;
                var pattern = /[^A-Za-z ]+/g;
                function fromUser(text) {
                    if (!text)
                        return text;

                    var transformedInput = text.replace(pattern, '');
                    if (transformedInput !== text) {
                        ngModelCtrl.$setViewValue(transformedInput);
                        ngModelCtrl.$render();
                    }
                    return transformedInput;
                }
                ngModelCtrl.$parsers.push(fromUser);
            }
        };
    });

  KidzFountainWebApp.directive('loadingContent', function ($http) {
        return {
            restrict: "E",
            template: '<div class="layer_loading" ng-if="loadingContent"><div class="loading_container" ><span class="loader">Loading</span><span class="_text"> Loading...</span></div></div>',
            replace: true,
            link: function (scope, element, attrs) {

                scope.isLoading = function () {
                    return $http.pendingRequests.length > 0;
                };

                scope.$watch(scope.isLoading, function (value)
                {
                  scope.loadingContent = value ? true : false;
                });

            }
        };
    });

  //Server https://secret-crag-94036.herokuapp.com/

   // KidzFountainWebApp.constant('serverUrl', 'http://54.148.241.255');

    KidzFountainWebApp.constant('serverUrl', 'http://localhost:8080');
  config.$inject = ['$routeProvider', '$locationProvider'];

  function config($routeProvider, $locationProvider) {
    $routeProvider
      
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/register', {
              templateUrl: 'views/register.html',
                controller: 'RegisterCtrl',
                controllerAs: "register"
        })
      .when('/login', {
              templateUrl: 'views/login.html',
                controller: 'loginCtrl',
                controllerAs: "login"
        })
      .when('/adminLanding', {
              templateUrl: 'views/admin-landing-page.html',
                controller: 'adminLandingPageCtrl',
                controllerAs: "adminLandingPage"
        })
      .when('/application', {
              templateUrl: 'views/application.html',
                controller: 'applicationCtrl',
                controllerAs: "application"
        })
      .when('/password', {
              templateUrl: 'views/enterpassword.html',
                controller: 'enterpasswordCtrl',
                controllerAs: "login"
        })
      .when('/superAdminLanding', {
              templateUrl: 'views/super-adim-landing-page.html',
                controller: 'superAdminLandingPageCtrl',
                controllerAs: "superAdminLandingPage"
        })
      .when('/profile', {
              templateUrl: 'views/update-admin.html',
                controller: 'adminProfileCtrl',
                controllerAs: "profile"
        })
      .when('/user', {
              templateUrl: 'views/user-profile.html',
                controller: 'usersCtrl',
                controllerAs: "user"
        })
       .when('/userLanding', {
              templateUrl: 'views/user-landing-page.html',
                controller: 'userLandingCtrl',
                controllerAs: "userLanding"
        })
       .when('/proof', {
              templateUrl: 'views/proof-of-registration.html',
                controller: 'proofCtrl',
                controllerAs: "proof"
        })
        .when('/status', {
              templateUrl: 'views/status.html',
                controller: 'statusCtrl',
                controllerAs: "status"
        })
        .when('/email', {
              templateUrl: 'views/email.html',
                controller: 'emailCtrl',
                controllerAs: "email"
        })
        .when('/event', {
              templateUrl: 'views/event.html',
                controller: 'eventCtrl',
                controllerAs: "event"
        })
        .when('/events', {
              templateUrl: 'views/events-list.html',
                controller: 'eventsCtrl',
                controllerAs: "events"
        })
        .when('/students', {
              templateUrl: 'views/students-view.html',
                controller: 'studentsCtrl',
                controllerAs: "events"
        })

      .otherwise({
        redirectTo: '/login'
      });
    }

      run.$inject = ['$rootScope', '$location', '$cookies', '$http'];

    function run($rootScope, $location, $cookies, $http) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookies.getObject('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic' + $rootScope.globals.currentUser.authdata;
        }
      }

