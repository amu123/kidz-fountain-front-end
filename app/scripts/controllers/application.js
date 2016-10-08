'use strict';

/**
 * @ngdoc function
 * @name angularTutorialApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the angularTutorialApp
 */
angular.module('KidzFountainWebApp')

.controller('applicationCtrl',function($rootScope, $scope, UserService,$location,ApplicationService,ValidationService) {
      $scope.user = {};
    $scope.save = function(){

      console.log($scope.user)
      var isEmailValid = ValidationService.validateEmail($scope.user.email);
      var isContactValid = ValidationService.validateCellNumber($scope.user.contact);
      var isIdValid = ValidationService.validateIdNumber($scope.user.idNumber);
      var isParentIdValid = ValidationService.validateIdNumber($scope.user.parentIdNumber);
      if(isEmailValid == true && isContactValid == true && isIdValid ==true && isParentIdValid==true)
      {
        console.log($scope.user)
     
        ApplicationService.apply($scope.user).then(function(res){
          
          if(res.status == 201)
          {
            console.log(res)
            alert('Your application has successfully submited and the email is sent to confirm it....Please use the student number to sign in....Student Number:' + res.data.studentNumber);
            $location.path('/login');
           
          }
            else if(res.status == 200){
               alert('Your application has successfully submited,but the email was not sent to you due to network problem..Please use the student number to sign in....Student Number:' + res.data.studentNumber);
                $location.path('/login');
            }
            else
            {
              console.log(res)
              
            }

        });
    }
     else if(isEmailValid ==false)
      {
        alert('Please check your email properly');
      }
    };
  
  	
   });