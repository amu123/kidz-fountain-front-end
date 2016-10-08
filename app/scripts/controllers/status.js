'use strict';

/**
 * @ngdoc function
 * @name angularTutorialApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the angularTutorialApp
 */
angular.module('KidzFountainWebApp')

.controller('statusCtrl', StatusCtrl);

 StatusCtrl.$inject = ['$rootScope', '$scope', 'UserService','$location','ApplicationService','$window']

function StatusCtrl($rootScope, $scope, UserService,$location,ApplicationService,$window) {
	$scope.status = true;
	$scope.user = {};
  $scope.user.studentNumber  = $window.localStorage.getItem('studentNumber');
  if($scope.user.studentNumber == null){
    $location.path('/login');
  }
  else
  {

 
  	
  		ApplicationService.getUser($scope.user).then(function(res){
  			console.log(res)
  			if(res.status == 200)
  			{
  				$scope.user = res.data;
  				$scope.status = false;
  				$scope.user.proof = "Name: " + $scope.user.name + " " + $scope.user.surname +
  									"\nStudent number: " +  $scope.user.studentNumber +
  									"\nID number: " + $scope.user.idNumber +
  									"\nStatus: " + $scope.user.applicationStatus;
         		
  			}
  			

  		});
       }
  }
 