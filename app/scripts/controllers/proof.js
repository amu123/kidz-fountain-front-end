
/**
 * @ngdoc function
 * @name angularTutorialApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the angularTutorialApp
 */
angular.module('KidzFountainWebApp')

.controller('proofCtrl', function($rootScope, $scope, UserService,$location,$window,ApplicationService,$filter) {

	var studentNumber = $window.localStorage.getItem('studentNumber');
  if(studentNumber == null){
    $location.path('/login')
  }
  else
  {


	$scope.user = {};
	$scope.user.studentNumber = studentNumber;
	var currentDate = new Date(); 
	var year = $filter('date')(new Date(currentDate), 'yyyy');
    ApplicationService.getUser($scope.user).then(function(res){
      console.log(res)
      $scope.user = res.data;
     $scope.user.proof = "                                                                 To whom it may concern\n\nIt is hereby confirmed that  " +   $scope.user.name + " " +  $scope.user.surname + ", ID number:"+
     					 $scope.user.idNumber + ", student number:" + $scope.user.studentNumber
     					+"\nwas registered in our institution 'Kidz Fountain Pre-school' from 1st of january " + year + " to 31st of december " + year+
     					"\n\n\n\nWarmest Regards\n Kidz Fountain Pre-school";
    })
  }
});