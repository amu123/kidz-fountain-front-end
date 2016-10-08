'use strict';

/**
 * @ngdoc function
 * @name angularTutorialApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularTutorialApp
 */
angular.module('KidzFountainWebApp')
  .controller('MainCtrl', function ($scope,ApplicationService,$window) {
  	 $scope.loggedIn = true;
  	 console.log( $scope.loggedIn)
     $window.localStorage.clear();
    $scope.applicationStatus = false;
  $scope.registrationStatus = false;
  $scope.ApplicationService = "Application closed";
  ApplicationService.getApplication().then(function(res){
    console.log(res)
     $scope.applicationStatus = res.data.applicationStatus;
     if($scope.applicationStatus ==  true)
     {
     	$scope.ApplicationService = "Application open";
     }
  $scope.registrationStatus = res.data.registrationStatus;
  })


  });
