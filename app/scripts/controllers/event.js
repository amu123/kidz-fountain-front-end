'use strict';

/**
 * @ngdoc function
 * @name angularTutorialApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the angularTutorialApp
 */
angular.module('KidzFountainWebApp')

.controller('eventCtrl', function($scope, UserService,$location,$window,ApplicationService,$filter,eventService) {
 	$scope.event = {};
 	

 	console.log($scope.event )
  	$scope.add = function(){
  		$scope.event.postedDate = $filter('date')(new Date(), 'yyyy-MMM-dd');
  		var date = $filter('date')(new Date($scope.date), 'yyyy-MMM-dd');
  		$scope.event.date = date;
  		$scope.event.isActive = true;
  		if($scope.event.title){
  			if($scope.event.description){
  				if($scope.date){
  					eventService.addEvent($scope.event).then(function(res){
			  			console.log(res)
			  			if(res.status == 201){
			  				alert("Event successfully added");
			  				$location.path('/events');
			  			}
			  		})
  		
  				}
  				else
  				{
  					alert("please fill the date field");
  				}
  			}
  			else
  				{
  					alert("please fill the description field");
  				}
  		}
  		else
  				{
  					alert("please fill the title field");
  				}
  		
  	}
    
  })
.controller('eventsCtrl',function($scope, $location,$window,$filter,eventService){
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
	eventService.getAllDeactiveEvents().then(function(res){
		console.log(res.data)
		if(res.data.length == 0)
		{
			$scope.isDeactiveEvents = false;
		}
		else
		{
			$scope.isDeactiveEvents = true;
			$scope.deactiveEvents = res.data;
		}
		
	})
	$scope.add = function(){
		$location.path('/event')
	}
	$scope.home = function(){
		$location.path('/superAdminLanding')
	}
	$scope.delete = function(event){
		eventService.delete(event).then(function(res){
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
	})
		console.log(event)
	}
	$scope.deletes = function(event){
		eventService.delete(event).then(function(res){
			eventService.getAllDeactiveEvents().then(function(res){
		console.log(res.data)
		if(res.data.length == 0)
		{
			$scope.isDeactiveEvents = false;
		}
		else
		{
			$scope.isDeactiveEvents = true;
			$scope.deactiveEvents = res.data;
		}
	})
		console.log(event)
	})

}
})