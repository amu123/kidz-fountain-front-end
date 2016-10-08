'use strict';

/**
 * @ngdoc function
 * @name KidzFountainWebApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the KidzFountainWebApp
 */
angular.module('KidzFountainWebApp')

.controller('adminLandingPageCtrl',function($rootScope, $scope, UserService,$location,$window,ApplicationService,eventService) {

  $scope.AdminLanding = true;

  $scope.staff = {};
  $scope.staff.staffNumber = $window.localStorage.getItem('staffNumber');
  console.log($scope.staff.staffNumber)
  $scope.hasRegisteredStudents = false;
  $scope.hasApprovedStudents = false;
  $scope.hasApplicationsStudents = false;
  $scope.hasRegisteredStudentss = true;
  $scope.hasApprovedStudentss = true;
  $scope.hasApplicationsStudentss = true;
  $scope.total = 0;
  $scope.StudentsStatus = "";



  $scope.viewApplicatios = false;
  $scope.viewAppoved = true;
  $scope.viewRegistration = true;

  // console.log($scope.staff)
  // $scope.user = {};
  // UserService.GetAdmin($scope.staff.staffNumber).then(function(res){
  //   $scope.staff = res.data;
  // })
  $scope.user = {};
   if($scope.staff.staffNumber != 'null'){


   $scope.user.staffNumber = $window.localStorage.getItem('staffNumber')
      UserService.GetAdmin($scope.user).then(function(res){
        if(res.status == 200)
        {
          console.log(res.data.idNumber)
          $scope.user = res.data;
        }
        
      });
   }
   else
   {
    $location.path('/login');
  }
  

      $scope.students = [];


      ApplicationService.getAllUsers().then(function(res){
         $scope.StudentsStatus = "Applications";
        $scope.hasApprovedStudentss = true;
              $scope.hasApplicationsStudentss = true;
        if(res.data.length > 0){
          console.log(res.data)
          for (var i = 0; i < res.data.length; i++) {
            if(res.data[i].applicationStatus != "Approved" && res.data[i].applicationStatus != "Registered")
            {
              $scope.students.push(res.data[i]);
              $scope.hasApplicationsStudents = true;
              $scope.hasRegisteredStudents = false;
              $scope.hasApprovedStudents = false;
              $scope.total++;
            }
          }
          console.log($scope.students.length)
          if($scope.students.length == 0){
              $scope.hasApplicationsStudentss = false;
              
            }
          
        }
         
         console.log(res)
      })

      $scope.viewapplication = function(student)
      {
        console.log($scope.student)
         window.localStorage.clear();
        $window.localStorage.setItem('studentNumber',student.studentNumber);
        $window.localStorage.setItem('staffNumber',$scope.staff.staffNumber);
        $window.localStorage.setItem('isAdmin',true)
        $location.path('/user');
      }
      $scope.viewprofile = function(admin)
      {
          window.localStorage.clear();
        $window.localStorage.setItem('staffNumber',$scope.staff.staffNumber);
        $window.localStorage.setItem('isSuperAdmin',false)
        $location.path('/profile');
      }
      $scope.searchStudent = function(){
        console.log($scope.searchStudentId);
        if($scope.searchStudentId && $scope.searchStudentId.length == 8)
        {
          $scope.student = {};
          $scope.student.studentNumber = $scope.searchStudentId;
          console.log(   $scope.student )
          ApplicationService.getUser($scope.student).then(function(res){
            if(res.status == 200){
                $scope.students =[];
              $scope.students.push(res.data);
            }
            
          })
        }
        else if($scope.searchStudentId && $scope.searchStudentId.length == 13)
        {
             $scope.student = {};
          $scope.student.idNumber = $scope.searchStudentId;
          console.log(   $scope.student )
          ApplicationService.getUserById($scope.student).then(function(res){
            if(res.status == 200){
                $scope.students =[];
              $scope.students.push(res.data);
            }
          })
        }
        else
        {
          alert("Please enter valid ID/Student number...lol")
        }
        
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
  $scope.viewAllApproved = function(){
    $scope.StudentsStatus = "Approved Applications";
    $scope.students = [];
    $scope.total = 0;
    $scope.viewApplicatios = true;
  $scope.viewAppoved = false;
  $scope.viewRegistration = true;
    $scope.hasApplicationsStudents = false;
      $scope.hasRegisteredStudents = false;
      $scope.hasRegisteredStudentss = true;
      $scope.hasApplicationsStudentss = true;
    ApplicationService.getAllUsers().then(function(res){
        if(res.data.length > 0){
          console.log(res.data)
          for (var i = 0; i <res.data.length; i++) {
            if(res.data[i].applicationStatus == "Approved")
            {
              $scope.students.push(res.data[i]);
              $scope.hasApprovedStudents = true;
              $scope.total++;
              
            }
          }
          if($scope.students.length == 0){
              $scope.hasApprovedStudentss = false;
              
            }

          
        }
         
         console.log(res)
      })
  }
  $scope.viewAllRegistered = function(){
     $scope.StudentsStatus = "Registered Applicants";
    $scope.viewApplicatios = true;
  $scope.viewAppoved = true;
  $scope.viewRegistration = false;
    $scope.students = [];
    $scope.total = 0;
    $scope.hasApprovedStudents = false;
    $scope.hasApplicationsStudents = false;
    $scope.hasApplicationsStudentss = true;
    $scope.hasApprovedStudentss = true;
     ApplicationService.getAllUsers().then(function(res){
        if(res.data.length > 0){
          console.log(res.data)
          for (var i = 0; i <res.data.length; i++) {
            if(res.data[i].applicationStatus == "Registered")
            {
              $scope.students.push(res.data[i]);
               $scope.hasRegisteredStudents = true;
               $scope.total++

            }

          }
          if($scope.students.length == 0){
              $scope.hasRegisteredStudentss = false;

            }
          
        }
         
         console.log(res)
      })
  }

  $scope.viewAllApplication = function(){
      $scope.StudentsStatus = "Applications";
     $scope.students = [];
    $scope.viewApplicatios = false;
  $scope.viewAppoved = true;
  $scope.viewRegistration = true;
  $scope.total = 0;
    ApplicationService.getAllUsers().then(function(res){
        $scope.hasApprovedStudentss = true;
        $scope.hasApplicationsStudentss = true;
        if(res.data.length > 0){
          console.log(res.data)
          for (var i = 0; i < res.data.length; i++) {
            if(res.data[i].applicationStatus != "Approved" && res.data[i].applicationStatus != "Registered")
            {
              $scope.students.push(res.data[i]);
              $scope.hasApplicationsStudents = true;
              $scope.hasRegisteredStudents = false;
              $scope.hasApprovedStudents = false;
              $scope.total++;
            }
          }
          console.log($scope.students.length)
          if($scope.students.length == 0){
              $scope.hasApplicationsStudentss = false;
              
            }
          
        }
         
         console.log(res)
      })
  }
  	
    
  })
.controller("studentsCtrl",function($rootScope, $scope, UserService,$location,$window,ApplicationService,eventService){
  // console.log($scope.staff.staffNumber)
  $scope.AdminLanding = true;

  $scope.staff = {};
  $scope.staff.staffNumber = $window.localStorage.getItem('staffNumber');
  console.log($scope.staff.staffNumber)
  // console.log($scope.staff)
  // $scope.user = {};
  // UserService.GetAdmin($scope.staff.staffNumber).then(function(res){
  //   $scope.staff = res.data;
  // })
  $scope.user = {};
   if($scope.staff.staffNumber != 'null'){


   $scope.user.staffNumber = $window.localStorage.getItem('staffNumber')
      UserService.GetAdmin($scope.user).then(function(res){
        if(res.status == 200)
        {
          console.log(res.data.idNumber)
          $scope.user = res.data;
        }
        
      });
   }
   else
   {
    $location.path('/login');
  }
  


      //$scope.students = [];


      ApplicationService.getAllUsers().then(function(res){
         $scope.students = res.data
         console.log(res)
      })

      $scope.viewapplication = function(student)
      {
        console.log($scope.student)
         window.localStorage.clear();
        $window.localStorage.setItem('studentNumber',student.studentNumber);
        $window.localStorage.setItem('staffNumber',$scope.staff.staffNumber);
        $window.localStorage.setItem('isAdmin',true)
        $location.path('/user');
      }
      $scope.viewprofile = function(admin)
      {
          window.localStorage.clear();
        $window.localStorage.setItem('staffNumber',$scope.staff.staffNumber);
        $window.localStorage.setItem('isSuperAdmin',false)
        $location.path('/profile');
      }
      $scope.searchStudent = function(){
        console.log($scope.searchStudentId);
        if($scope.searchStudentId && $scope.searchStudentId.length == 8)
        {
          $scope.student = {};
          $scope.student.studentNumber = $scope.searchStudentId;
          console.log(   $scope.student )
          ApplicationService.getUser($scope.student).then(function(res){
            if(res.status == 200){
                $scope.students =[];
              $scope.students.push(res.data);
            }
          })
        }
        else if($scope.searchStudentId && $scope.searchStudentId.length == 13)
        {
             $scope.student = {};
          $scope.student.idNumber = $scope.searchStudentId;
          console.log(   $scope.student )
          ApplicationService.getUserById($scope.student).then(function(res){
            if(res.status == 200){
                $scope.students =[];
              $scope.students.push(res.data);
            }
          })
        }
        else
        {
          alert("Please enter valid ID/Student number...lol")
        }
        
      }

     
})
  