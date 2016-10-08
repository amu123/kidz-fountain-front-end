'use strict';

/**
 * @ngdoc function
 * @name angularTutorialApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the angularTutorialApp
 */
angular.module('KidzFountainWebApp')

.controller('enterpasswordCtrl', function($rootScope, $scope, UserService,$location,$state) {
	$scope.user = {};
	$scope.passwordActive = true;
  	$scope.Login = function(){

  		console.log($scope.user)
  		UserService.GetAdmin($scope.user).then(function(res){
  			if(res.status == 200)
  			{

  				$location.path('/password');
  			}
  			
  		});
  	};



  
  	
    
  });