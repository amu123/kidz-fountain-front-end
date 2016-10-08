'use strict';

/**
 * @ngdoc function
 * @name angularTutorialApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularTutorialApp
 */
angular.module('KidzFountainWebApp')

.controller('usersCtrl',function($rootScope, $scope, UserService,$location,$window,ApplicationService,SuperAdminService,ValidationService){

     

  	var staffNumber = $window.localStorage.getItem('staffNumber');
    var isAdmin = $window.localStorage.getItem('isAdmin');
    var studentNumber = $window.localStorage.getItem('studentNumber')
    console.log(staffNumber,isAdmin,studentNumber)

    $scope.edit = false;

    $scope.user = {};
    $scope.editData = true;
    $scope.isAdmin = false;
    $scope.isRegistered = false;
    $scope.isRegisteredd = false;
    $scope.isApproved = false;
    $scope.isDeclined = false;
    if(isAdmin == 'true')
    {
      $scope.isAdmin = true;
    }
    $scope.user.studentNumber = studentNumber;
    if(studentNumber == null){
      $location.path('/login')
    }
    else{


    ApplicationService.getUser($scope.user).then(function(res){
      console.log(res)
      $scope.user = res.data;
      if($scope.user.applicationStatus == 'Registered')
      {
      console.log($scope.user.applicationStatus)
          $scope.isRegistered = true;
        if($scope.user.applicationStatus == 'Registered'){

         $scope.isRegisteredd = true;
        }

      }
      if( $scope.user.applicationStatus == 'Approved')
      {
        $scope.isApproved = true;
      }
      if($scope.user.applicationStatus == 'Declined'){
        $scope.isDeclined = true;
      }
    })
     }

    $scope.edits = function(){
       $scope.edit = false;
       $scope.editData = false;
       console.log("lol")
    }
    $scope.update = function()
    {
      var isEmailValid = ValidationService.validateEmail($scope.user.email);
      var isContactValid = ValidationService.validateCellNumber($scope.user.contact);
      if(isEmailValid == true && isContactValid == true)
      {

      ApplicationService.update($scope.user).then(function(res){
          console.log(res)
          if(res.status==200)
          {
            alert('Your information is successfully updated ');
            if(isAdmin == 'true')
          {
            $location.path('/adminLanding');
          }
          else
          {
            $location.path('/userLanding');
          }
          }
          

        })
    }
     else if(isEmailValid ==false)
      {
        alert('Please check your email properly');
      }
    }

    $scope.approve = function(){
      ApplicationService.approveApplication($scope.user).then(function(res){
        if(res.status == 200)
        {
          $location.path('/adminLanding');
        }
      })
    }
    $scope.delete = function(){
      ApplicationService.deleteUser($scope.user).then(function(res){
        if(res.status == 200)
        {
          $location.path('/adminLanding');
        }
      })
    }
    $scope.resetpassword = function(){
      ApplicationService.resetPassword($scope.user).then(function(res){
         if(res.status == 200)
        {
          if(isAdmin == 'true')
          {
            $location.path('/adminLanding');
          }
          else
          {
            $location.path('/login');
          }
          
        }
      })
    }
    $scope.decline = function(){
      ApplicationService.decline($scope.user).then(function(res){
        if(res.status == 200)
        {
          $location.path('/adminLanding');
        }
      })
    }
    $scope.deregister = function(){
       ApplicationService.deregister($scope.user).then(function(res){
        if(res.status == 200)
        {
          $location.path('/adminLanding');
        }
      })
    }




 $scope.sendEmail = function()
      {
        console.log($scope.student)
         window.localStorage.clear();
        $window.localStorage.setItem('studentNumber',studentNumber);
        $window.localStorage.setItem('staffNumber',staffNumber);
        $window.localStorage.setItem('isAdmin',true)
        $location.path('/email');
      }





  });