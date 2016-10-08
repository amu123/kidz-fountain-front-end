'use strict';

/**
 * @ngdoc function
 * @name angularTutorialApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularTutorialApp
 */
angular.module('KidzFountainWebApp')

.controller('adminProfileCtrl',function($rootScope, $scope, UserService,$location,$window,ApplicationService,SuperAdminService,ValidationService){
  	var staffNumber = $window.localStorage.getItem('staffNumber');
  	var isSuperAdmin = $window.localStorage.getItem('isSuperAdmin');
  	$scope.isSuperAdmin = false;
  	console.log(isSuperAdmin)
  	console.log(staffNumber)
  	 $scope.edit = true;
  	 $scope.deletes = false;

  	$scope.admin = {};
  	$scope.user = {};
  	

  	
  	$scope.admin.staffNumber = staffNumber;
  	$scope.admin.isSuperAdmin = isSuperAdmin;
    if(staffNumber == null){
      $location.path('/login');
    }
    else
    {


  	UserService.GetAdmin($scope.admin).then(function(res){
  		$scope.user =  res.data;
  		console.log($scope.admin)
  		if(isSuperAdmin == "true")
	  	 {
	  	 	console.log("lol")
	  	 	$scope.isSuperAdmin = true;
	  	 }
  	})
     }
  	
  	$scope.edits = function(){
  		$scope.user.edit  = false;

  		 $scope.edit = false;
  	}
  	$scope.update = function(){
      console.log($scope.user)
      // console.log(validateEmail($scope.user.email))
      // console.log(validateIdNumber($scope.user.idNumber))
      // console.log(validateCellNumber($scope.user.contact))
       var isEmailValid = ValidationService.validateEmail($scope.user.email);
      var isContactValid = ValidationService.validateCellNumber($scope.user.contact);
      // var isIdValid = ValidationService.validateIdNumber($scope.user.idNumber);
      if(isContactValid == true && isEmailValid ==true)
      {
    		UserService.updateAdmin($scope.user).then(function(res){
    			console.log(res)
    			if(res.status = 200)
    			{
    				if(isSuperAdmin == 'true')
    				{
    					console.log(isSuperAdmin)
               alert('Information successfully updated');
    					$location.path('/superAdminLanding');
    				}
    				else
    				{
               alert('Information successfully updated');
    					$location.path('/adminLanding');
    				}
    			}
    		})
      }
      else if(isEmailValid ==false)
      {
        alert('Please check your email properly');
      }
  	}
  	$scope.delete = function()
	  {
	   
	    SuperAdminService.deleteAdmin($scope.user).then(function(res){
	      console.log(res)
	      if(res.status == 200)
	      {
	        $location.path('/superAdminLanding');
	      
	      }
	    })
	  };
	  $scope.resetpassword = function(){
	  	UserService.clearAdminPassword($scope.user).then(function(res){
	  		if(res.status == 200)
	  		{
	  			if(isSuperAdmin == 'true')
  				{
  					console.log(isSuperAdmin)
  					$location.path('/superAdminLanding');
  				}
  				else
  				{
  					$location.path('/login');
  				}
	  		}
	  		
	  	})
	  }
     $scope.sendEmail = function()
      {
        console.log($scope.student)
         window.localStorage.clear();
        $window.localStorage.setItem('staffNumber',staffNumber);
        $window.localStorage.setItem('adminNumber',12345);
        $window.localStorage.setItem('isSuperAdmin',true)
        $window.localStorage.setItem('to',$scope.user.name + " " + $scope.user.surname );
        $location.path('/email');
      }



  });