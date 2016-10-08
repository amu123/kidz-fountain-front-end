'use strict';

/**
 * @ngdoc function
 * @name angularTutorialApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the angularTutorialApp
 */
angular.module('KidzFountainWebApp')

.controller('emailCtrl', function($rootScope, $scope, UserService,$location,$window,ApplicationService) {
	
 $scope.user = {};

$scope.sendTo = "";;
var staffNumber = $window.localStorage.getItem('staffNumber');
    var isAdmin = $window.localStorage.getItem('isAdmin');
    var studentNumber = $window.localStorage.getItem('studentNumber')
     $scope.user.studentNumber = studentNumber;
    console.log(staffNumber,isAdmin,studentNumber)
    if(isAdmin== "true")
    {
      ApplicationService.getUser($scope.user).then(function(res){
      console.log(res)
      $scope.user = res.data;
         $scope.sendTo = "Send email to " + $scope.user.name + " "+ $scope.user.surname;
      });
    }


    var to = $window.localStorage.getItem("to");
    var superAdmin =  $window.localStorage.getItem("adminNumber");;
    var isSuperAdmin = $window.localStorage.getItem("isSuperAdmin");

     console.log(to,superAdmin,isSuperAdmin)

     if(isSuperAdmin == "true")
     {
        $scope.sendTo = "Send email to all " + to;
        console.log("lol")

     }

     $scope.send = function(){
      if(isAdmin== "true")
      {
         $scope.user.to = $scope.user.email;
         console.log($scope.user)
         ApplicationService.sendEmail($scope.user).then(function(res){
                console.log(res);
              
                 if(res.status == 200){
                  alert('email sent.....');
                
                }
                else
                {
                  alert('email not sent due to network problem...try again later...');
                }
                   $location.path('/adminLanding');
          })
      }
      else
      {
          if(to == "admin")
          {
              $scope.staff = {};
              $scope.user.staffNumber = staffNumber;
              console.log( $scope.user)
              UserService.GetAdmin($scope.user).then(function(res){
                console.log(res)
                $scope.staff.email = res.data.email;
                 $scope.staff.message =  $scope.user.message;
                 $scope.staff.subject =  $scope.user.subject;
                 console.log($scope.staff)
                UserService.sendEmail($scope.staff).then(function(res){
                console.log(res);
                  if(res.status == 200){
                  alert('email sent.....');
                
                }
                else
                {
                  alert('email not sent due to network problem...try again later...');
                }
                 $location.path('/superAdminLanding');
               })
              })
               
          }
          else if(to == "admins")
          {
              console.log($scope.user);

               UserService.sendEmailToAllAdmins($scope.user).then(function(res){
                console.log(res)
                  if(res.status == 200){
                  alert('email sent.....');
                
                }
                else
                {
                  alert('email not sent due to network problem...try again later...');
                }
                 $location.path('/superAdminLanding');
               })

          }
          else
          {
            console.log($scope.user)
            ApplicationService.sendEmailToAllUsers($scope.user).then(function(res){
                console.log(res);
                if(res.status == 200){
                  alert('email sent.....');
                
                }
                else
                {
                  alert('email not sent due to network problem...try again later...');
                }
                 $location.path('/superAdminLanding');
               })
          }
      }
     }

     $scope.cancel = function(){
      if(isAdmin== "true"){
        $location.path('/adminLanding');
      }
      else
      {
        $location.path('/superAdminLanding');
      }
     }
  
  	
    
  });