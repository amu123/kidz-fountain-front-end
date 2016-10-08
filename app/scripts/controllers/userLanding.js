'use strict';

/**
 * @ngdoc function
 * @name angularTutorialApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the angularTutorialApp
 */
angular.module('KidzFountainWebApp')

.controller('userLandingCtrl', UserLandingCtrl);

 UserLandingCtrl.$inject = ['$rootScope', '$scope', 'UserService','$location','$window','ApplicationService','eventService'];

function UserLandingCtrl($rootScope, $scope, UserService,$location,$window,ApplicationService,eventService) {

  // $scope.AdminLanding = true;

  $scope.student = {};
  $scope.user = {};
  $scope.isRegistered = false;
  $scope.isApproved= false;
  $scope.isRegistrationActive = false;


  $scope.student.studentNumber = $window.localStorage.getItem('studentNumber');
 

  ApplicationService.getApplication().then(function(res){
  $scope.isRegistrationActive = res.data.registrationStatus;
  })



 if($scope.student.studentNumber == null)
  {
    $location.path('/login')
  }
  else{


  ApplicationService.getUser($scope.student).then(function(res){
    console.log(res)
    $scope.user = res.data;
    console.log($scope.user.applicationStatus)
    if($scope.user.applicationStatus == 'Approved')
    {
         $scope.isApproved = true;
    }
    else if($scope.user.applicationStatus == 'Registered')
    {
      console.log($scope.user.applicationStatus)
         $scope.isRegistered = true;
    }
  })
}
  $scope.checkStatus =function(){
    window.localStorage.clear();
        $window.localStorage.setItem('studentNumber',$scope.student.studentNumber);
        $location.path('/status');
  }
  $scope.proof = function(){
    console.log($scope.student)
         window.localStorage.clear();
        $window.localStorage.setItem('studentNumber',$scope.student.studentNumber);
        $window.localStorage.setItem('isAdmin',false)
        $location.path('/proof');
  }
  $scope.viewprofile = function(student)
      {
        console.log($scope.student)
         window.localStorage.clear();
        $window.localStorage.setItem('studentNumber',$scope.student.studentNumber);
        $window.localStorage.setItem('isAdmin',false)
        $location.path('/user');
      }


  
  $scope.register = function(){
    ApplicationService.register($scope.user).then(function(res){
      console.log(res.status)
       $location.path('/proof');
    })
  }

  	
    $scope.events = [];
  $scope.deactiveEvents = [];
  $scope.activeEvents = false;
  $scope.isDeactiveEvents = false;
  
  eventService.getAllActiveEvents().then(function(res){
    console.log(res)
    if(res.data.length == 0)
    {
      $scope.activeEvents = false;
    }
    else
    {
      
      $scope.activeEvents = true;
      $scope.events = res.data;

    }
    
  })
  };