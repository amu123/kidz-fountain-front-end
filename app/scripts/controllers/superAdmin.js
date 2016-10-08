
/**
 * @ngdoc function
 * @name angularTutorialApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the angularTutorialApp
 */
angular.module('KidzFountainWebApp')

.controller('superAdminLandingPageCtrl', SuperAdminLandingPageCtrl);

 SuperAdminLandingPageCtrl.$inject = ['$rootScope', '$scope', 'UserService','$location','$window','ApplicationService','SuperAdminService'];

function SuperAdminLandingPageCtrl($rootScope, $scope, UserService,$location,$window,ApplicationService,SuperAdminService) {


   $scope.logged = true;
  $scope.applicationStatus = "false";
  $scope.registrationStatus = "false";
   $scope.applicationStatuss = false;
  $scope.registrationStatuss = false;
  $scope.logidddn = true;
   $scope.superAdmin = {};
  $scope.superAdmin.adminNumber = $window.localStorage.getItem('adminNumber');
  console.log($scope.superAdmin.adminNumber)

  if($scope.superAdmin.adminNumber == null){
    console.log("lol")
    $location.path('/login');
  }
  else
  {
     console.log($scope.superAdmin.adminNumber)
    console.log("lol")
    
  }
  ApplicationService.getApplication().then(function(res){
    console.log(res)
     $scope.applicationStatus = res.data.applicationStatus;
     if( $scope.applicationStatus == "true")
     {
      $scope.applicationStatuss = true;
     }

    $scope.registrationStatus = res.data.registrationStatus;
    if( $scope.registrationStatus == "true"){
       $scope.registrationStatuss = true;
    }

  })


  $scope.admins = [];

  SuperAdminService.getAllAdmins().then(function(res){
    $scope.admins = res.data;
    console.log($scope.admins)
  })

  $scope.delete = function(adim)
  {
    console.log(adim)
    SuperAdminService.deleteAdmin(adim).then(function(res){
      console.log(res)
      if(res.status == 200)
      {
        SuperAdminService.getAllAdmins().then(function(res){
        $scope.admins = res.data;
        console.log($scope.admins)
      })
      }
    })
  };

  $scope.register = function(){
     $location.path('/register');
  }
  $scope.edit = function(admin)
  {
      $window.localStorage.clear();
    $window.localStorage.setItem('staffNumber',admin.staffNumber);
    $window.localStorage.setItem('adminNumber',$scope.superAdmin.adminNumber);
    $window.localStorage.setItem('isSuperAdmin',true)
    $location.path('/profile');
  }
  $scope.activateApplication = function(){
    $scope.application = {};
    $scope.application.status = "true";
    ApplicationService.setApplicationStatus($scope.application).then(function(res){
        console.log(res)
      $scope.applicationStatus = res.data.applicationStatus;
      
  $scope.registrationStatus = res.data.registrationStatus;
    })

  }
  $scope.deactivateApplication = function(){
     $scope.application = {};
    $scope.application.status = "false";
    ApplicationService.setApplicationStatus($scope.application).then(function(res){
        console.log(res)
          $scope.applicationStatus = res.data.applicationStatus;
  $scope.registrationStatus = res.data.registrationStatus;
    })
    
  }
  $scope.activateRegistration = function(){
     $scope.application = {};
    $scope.application.status = "true";
    ApplicationService.setRegistrationStatus($scope.application).then(function(res){
        console.log(res)
          $scope.applicationStatus = res.data.applicationStatus;
  $scope.registrationStatus = res.data.registrationStatus;
    })
  }
  $scope.deactivateResgistration = function(){
     $scope.application = {};
    $scope.application.status = "false";
    ApplicationService.setRegistrationStatus($scope.application).then(function(res){
        console.log(res)
          $scope.applicationStatus = res.data.applicationStatus;
  $scope.registrationStatus = res.data.registrationStatus;
    })
  }

  $scope.sentEmailToAdmins = function(){

    $window.localStorage.clear();
    $window.localStorage.setItem('to','admins');
    $window.localStorage.setItem('adminNumber',$scope.superAdmin.adminNumber);
    $window.localStorage.setItem('isSuperAdmin',true)
    $location.path('/email');
  }
  $scope.sendEmailToParents = function(){

    $window.localStorage.clear();
    $window.localStorage.setItem('to','Parents');
    $window.localStorage.setItem('adminNumber',$scope.superAdmin.adminNumber);
    $window.localStorage.setItem('isSuperAdmin',true)
    $location.path('/email');
  }
  $scope.addEvent = function(){
    $location.path('/events');
  }
};