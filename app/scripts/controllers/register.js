'use strict';

/**
 * @ngdoc function
 * @name angularTutorialApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the angularTutorialApp
 */
angular.module('KidzFountainWebApp')

.controller('RegisterCtrl', RegisterController);

 RegisterController.$inject = ['$rootScope', '$scope', 'UserService','$location','ValidationService','$window']

function RegisterController($rootScope, $scope, UserService,$location,ValidationService,$window) {
	$scope.user = {};
  $scope.staff = {};
  $scope.staff.staffNumber = $window.localStorage.getItem('adminNumber');
  console.log($scope.staff.staffNumber)
  if($scope.staff.staffNumber == null){
    $location.path('/login');
  }

  	$scope.save = function(){
      var isEmailValid = ValidationService.validateEmail($scope.user.email);
      var isContactValid = ValidationService.validateCellNumber($scope.user.contact);
      var isIdValid = ValidationService.validateIdNumber($scope.user.idNumber);
      if(isEmailValid == true && isContactValid == true && isIdValid ==true)
      {
          UserService.Create($scope.user).then(function(res){
            if(res.status == 201)
            {
                  alert('You are successfully registered....Please use the staff number to sign in....Staff Number:' + res.data.staffNumber);
                  $location.path('/superAdminLanding');
           
            }
            if(res.status == 200)
            {
               alert(res.data.idNumber)
            }
        
         
          
         
        
        },function(error){
          console.log(error)
        });
      }
       else if(isEmailValid ==false)
      {
        alert('Please check your email properly');
      }
  	
  	};

   
    
  };