'use strict';

/**
 * @ngdoc function
 * @name angularTutorialApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the angularTutorialApp
 */
angular.module('KidzFountainWebApp')
.controller('loginCtrl',function($rootScope, $scope, UserService,$location,$window,SuperAdminService,ApplicationService) {
	$scope.user = {};
	$scope.passwordActive = true;
	$scope.loginsssss = false;
	$scope.submitDetails = true;
	$scope.enterpassword = false;
	$scope.uuu = {};
  $scope.validUsername = true;
  $scope.name = '';
   



    console.log( $scope.loggedIn)
     $window.localStorage.clear();
    $scope.applicationStatus = "false";
  $scope.registrationStatus = false;
  $scope.ApplicationService = "Application closed";
  ApplicationService.getApplication().then(function(res){
    console.log(res)
     $scope.applicationStatus = res.data.applicationStatus;
     if($scope.applicationStatus ==  "true")
     {
      $scope.ApplicationService = "Application open";
     }
  $scope.registrationStatus = res.data.registrationStatus;
  })





  $scope.activateButton = function(){
    if($scope.user.username.length == 5 || $scope.user.username.length == 8 || $scope.user.username.length == 10){
      $scope.validUsername = false;
    }
    else
    {
      $scope.validUsername = false;
    }
  }
  	$scope.submitUsername = function(){

  		console.log($scope.user)
      if($scope.user.username.length == 5)
      {
         $scope.user.adminNumber = $scope.user.username;

         SuperAdminService.getSuperAdmin( $scope.user).then(function(res){
          if(res.status == 200)
          {
            $scope.name = "Super admin"
            console.log(res)
            $scope.enterpassword = true;
            if(res.data.password == null || res.data.password == 'null' )
            {
              $scope.passwordActive = false;
            }
            else
            {
              $scope.loginsssss = true;
              $scope.submitDetails = false;
            }
          }
          else
          {
            console.log(res)
          }
         })
         console.log($scope.user)

      }
       else if($scope.user.username.length == 10)
       {
          $scope.user.staffNumber = $scope.user.username;
        UserService.GetAdmin($scope.user).then(function(res){
          if(res.status == 200)
          {
             $scope.name = res.data.name + " " + res.data.surname;
            $scope.enterpassword = true;
            if(res.data.password == null || res.data.password == 'null')
            {
              $scope.passwordActive = false;
            }
            else
            {
              $scope.loginsssss = true;
              $scope.submitDetails = false;
            }
          }
          
        });
      }
      else if($scope.user.username.length == 8)
      {
          $scope.user.studentNumber = $scope.user.username;
          console.log($scope.user)
          ApplicationService.getUser($scope.user).then(function(res){
            console.log(res)
            if(res.status == 200)
            {
               $scope.name = res.data.name + " " + res.data.surname;
            $scope.enterpassword = true;
            if(res.data.password == null || res.data.password == 'null')
            {
              $scope.passwordActive = false;
            }
            else
            {
              $scope.loginsssss = true;
              $scope.submitDetails = false;
            }
          }

          })
      }
      else
      {
        alert("Username does not exist");
      }
      
  	};

  	$scope.setPassword = function(){

      if($scope.user.username.length == 10)
      {
  			console.log($scope.user)
  			console.log($scope.uuu.confirmpassword)
  			if($scope.user.password == $scope.uuu.confirmpassword)
  			{
  				UserService.setAdminPassword($scope.user).then(function(res){
  					console.log(res)
            var staffNumber = '';
           $window.localStorage.setItem('staffNumber',res.data.staffNumber);
           console.log($window.localStorage.getItem('staffNumber'));
           $location.path('/adminLanding');
  				})
  			}
  			else
  			{
  				alert("Passwords dont match");
  			}
      }
      else
      {
          console.log($scope.user)
        console.log($scope.uuu.confirmpassword)
        if($scope.user.password == $scope.uuu.confirmpassword)
        {
          
          ApplicationService.setPassword($scope.user).then(function(res){
            console.log(res)
            var staffNumber = '';
           $window.localStorage.setItem('studentNumber',res.data.studentNumber);
           console.log($window.localStorage.getItem('staffNumber'));
           $location.path('/userLanding');
          })
        }
        else
        {
            alert("Passwords dont match");
        }
      }
  		


  	}

  	$scope.loginss = function(){
      console.log($scope.user)
      if($scope.user.username.length == 5)
      {
        if($scope.user.password)
        {
          SuperAdminService.login($scope.user).then(function(res){
           console.log(res)
           
           $window.localStorage.setItem('adminNumber',res.data.adminNumber);
            console.log($window.localStorage.getItem('adminNumber'));
            $location.path('/superAdminLanding');
         })
        }
        
      }
      else if($scope.user.username.length == 10)
      {
        if($scope.user.password)
        {
         UserService.login($scope.user).then(function(res){
           console.log(res)
           var staffNumber = '';
           $window.localStorage.setItem('staffNumber',res.data.staffNumber);
            console.log($window.localStorage.getItem('staffNumber'));
            $location.path('/adminLanding');
         })
      }
      }
      else if($scope.user.username.length == 8)
      {
        console.log($scope.user)
        ApplicationService.login($scope.user).then(function(res){
          console.log(res)
          $window.localStorage.setItem('studentNumber',res.data.studentNumber);
           $location.path('/userLanding');
        })
      }
  		
  	}



  
  	
    
  });