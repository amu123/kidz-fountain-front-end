'use strict';
angular.module('KidzFountainWebApp')

.service('UserService', function ($http, $location, $q,  serverUrl) {

	 var deferred = $q.defer();
    var promise = deferred.promise;

    
	this.Create = function (user) {

		var dfd = $q.defer();
		var request = {};
        request.method = "POST";
        request.data = user;
        request.url = serverUrl + "/admin/create";
         $http(request).then(function (response) {
          dfd.resolve(response);
        },function(error){
	     	 alert("Please fill all the fields");
	     	});
         
        return dfd.promise;
		// $http.put(serverUrl + "/users", user);

		//return 
	}

	this.GetAdmin = function(staff)
	{
		var dfd = $q.defer();
		var request = {};
        request.method = "POST";
        request.data = staff;
        request.url = serverUrl + "/admin/staff";
        $http(request).then(function (response) {
          dfd.resolve(response);
        },function(error){
        	$location.path('/login');
	     	 alert("staff not found...please check your staff number");
	     });
        return dfd.promise;

	}
	this.login = function(creditials){

		var dfd = $q.defer();
		var request = {};
        request.method = "POST";
        request.data = creditials;
        request.url = serverUrl + "/admin/login";
        $http(request).then(function (response) {
          dfd.resolve(response);
        },function(error){
	     	 alert("You have entered a wrong password....please try again");
	    });
        return dfd.promise;
    }
		

		this.setAdminPassword = function(user){
			var dfd = $q.defer();
			var request = {};
	        request.method = "POST";
	        request.data = user;
	        request.url = serverUrl + "/admin/setpassword";
	        console.log(request)
	        $http(request).then(function (response) {
	         dfd.resolve(response);
	        }, function (error) {
	          dfd.error(error);
	        });
	        return dfd.promise;

		}
		this.clearAdminPassword = function(user){
			var dfd = $q.defer();
			var request = {};
	        request.method = "POST";
	        request.data = user;
	        request.url = serverUrl + "/admin/clearpassword";
	        console.log(request)
	        $http(request).then(function (response) {
	        	alert("Password resetted...please set a new one....");
	         dfd.resolve(response);
	        }, function (error) {
	          dfd.error(error);
	        });
	        return dfd.promise;

		}
		// this.getStaff = function(data) {
		// 	var dfd = $q.defer();
		// 	var request = {};
	 //    request.method = "POST";
	 //    request.data = data
	 //    request.url = serverUrl + "/admin/staff";
	 //    return $http(request).then(function(res){
	 //    	dfd.resolve(res);
	 //    },function(error){
	 //    	 alert("staff not found...please check your staff number");
	 //    });
		// }
		this.updateAdmin  = function(admin){
			var dfd = $q.defer();
			var request = {};
	    request.method = "POST";
	    request.data = admin
	    request.url = serverUrl + "/admin";
	    $http(request).then(function (response) {
	         dfd.resolve(response);
	        }, function (error) {
	          dfd.error(error);
	        });
	        return dfd.promise;
		}
		this.sendEmail  = function(admin){
			var dfd = $q.defer();
			var request = {};
	    request.method = "POST";
	    request.data = admin
	    request.url = serverUrl + "/admin/staff/send/email";
	    $http(request).then(function (response) {
	         dfd.resolve(response);
	        }, function (error) {
	          dfd.error(error);
	        });
	        return dfd.promise;
		}
		this.sendEmailToAllAdmins  = function(admin){
			var dfd = $q.defer();
			var request = {};
	    request.method = "POST";
	    request.data = admin
	    request.url = serverUrl + "/admin/staff/send/email/all";
	    $http(request).then(function (response) {
	         dfd.resolve(response);
	        }, function (error) {
	          dfd.error(error);
	        });
	        return dfd.promise;
		}

	
})
.service("ApplicationService",function($http, $location, $q,  serverUrl){
	this.apply = function(user){
		var dfd = $q.defer();
		var request = {};
        request.method = "PUT";
        request.data = user;
        request.url = serverUrl + "/users";
         $http(request).then(function (response) {
         	
         		  dfd.resolve(response);
         
         	
        
        
        });
        return dfd.promise;
	}
	this.getAllUsers = function(){
		var dfd = $q.defer();
		var request = {};
		request.method = "GET";
		 request.url = serverUrl + "/users";
		  $http(request).then(function (response) {
          dfd.resolve(response);
        
        });
        return dfd.promise;

	}
	this.approveApplication = function(user)
	{
		var dfd = $q.defer();
			var request = {};
	        request.method = "POST";
	        request.data = user;
	        request.url = serverUrl + "/users/approve";
	        $http(request).then(function (response) {
	         dfd.resolve(response);
	        }, function (error) {
	          dfd.error(error);
	        });
	        return dfd.promise;
	}
	this.register = function(user)
	{
		var dfd = $q.defer();
			var request = {};
	        request.method = "POST";
	        request.data = user;
	        request.url = serverUrl + "/users/register";
	        $http(request).then(function (response) {
	         dfd.resolve(response);
	        });
	        return dfd.promise;
	}
	this.getUser = function(user){
		var dfd = $q.defer();
			var request = {};
	        request.method = "POST";
	        request.data = user;
	        request.url = serverUrl + "/users/user";
	        $http(request).then(function (response) {
	         dfd.resolve(response);
	        }, function (error) {
	           alert("User not found...please check your student number");
	        });
	        return dfd.promise;
	}
	this.getUserById = function(user){
		var dfd = $q.defer();
			var request = {};
	        request.method = "POST";
	        request.data = user;
	        request.url = serverUrl + "/users/user/idNumber";
	        $http(request).then(function (response) {
	         dfd.resolve(response);
	        }, function (error) {
	           alert("User not found...please check your id number");
	        });
	        return dfd.promise;
	}
	this.login = function(user){
		var dfd = $q.defer();
			var request = {};
	        request.method = "POST";
	        request.data = user;
	        request.url = serverUrl + "/users/login";
	        $http(request).then(function (response) {
	         dfd.resolve(response);
	        }, function (error) {
	          alert("You have entered a very wrong password...please try again");
	        });
	        return dfd.promise;
	}
	this.update = function(user){
		var dfd = $q.defer();
			var request = {};
	        request.method = "POST";
	        request.data = user;
	        request.url = serverUrl + "/users";
	        $http(request).then(function (response) {
	         dfd.resolve(response);
	        }, function (error) {
	          alert("Please fill all the fields...");
	        });
	        return dfd.promise;
	}
	this.setPassword = function(user){
			var dfd = $q.defer();
			var request = {};
	        request.method = "POST";
	        request.data = user;
	        request.url = serverUrl + "/users/setpassword";
	        console.log(request)
	        $http(request).then(function (response) {

	         dfd.resolve(response);
	        }, function (error) {
	          dfd.error(error);
	        });
	        return dfd.promise;

		}
	this.deleteUser = function(user){
		var dfd = $q.defer();
			var request = {};
	        request.method = "DELETE";
	        request.data = user;
	        request.url = serverUrl + "/users";
	        console.log(request)
	        $http(request).then(function (response) {
	         dfd.resolve(response);
	        }, function (error) {
	          dfd.error(error);
	        });
	        return dfd.promise;
	}
	this.resetPassword = function(user){
		var dfd = $q.defer();
			var request = {};
	        request.method = "POST";
	        request.data = user;
	        request.url = serverUrl + "/users/clearpassword";
	        console.log(request)
	        $http(request).then(function (response) {
	        	alert("Password resetted...please set a new one....");
	         dfd.resolve(response);
	        }, function (error) {
	        });
	        return dfd.promise;
	}
	this.decline = function(user){
		var dfd = $q.defer();
			var request = {};
	        request.method = "POST";
	        request.data = user;
	        request.url = serverUrl + "/users/decline";
	        console.log(request)
	        $http(request).then(function (response) {
	         dfd.resolve(response);
	        }, function (error) {
	          dfd.error(error);
	        });
	        return dfd.promise;
	}
	this.deregister = function(user){
		var dfd = $q.defer();
			var request = {};
	        request.method = "POST";
	        request.data = user;
	        request.url = serverUrl + "/users/deregister";
	        console.log(request)
	        $http(request).then(function (response) {
	         dfd.resolve(response);
	        }, function (error) {
	          dfd.error(error);
	        });
	        return dfd.promise;
	}
	this.getApplication = function(){
		var dfd = $q.defer();
			var request = {};
	        request.method = "POST";
	        request.url = serverUrl + "/application/getApplication";  
	        $http(request).then(function (response) {
	         dfd.resolve(response);
	        }, function (error) {
	          dfd.error(error);
	        });
	        return dfd.promise;
	}
	this.setApplicationStatus = function(status){
		var dfd = $q.defer();
			var request = {};
	        request.method = "POST";
	        request.data = status;
	        request.url = serverUrl + "/application/setApplicationStatus";  
	        $http(request).then(function (response) {
	         dfd.resolve(response);
	        }, function (error) {
	          dfd.error(error);
	        });
	        return dfd.promise;
	}
	this.setRegistrationStatus = function(status){
		var dfd = $q.defer();
			var request = {};
	        request.method = "POST";
	        request.data = status;
	        request.url = serverUrl + "/application/setRegistrationStatus";  
	        $http(request).then(function (response) {
	         dfd.resolve(response);
	        }, function (error) {
	          dfd.error(error);
	        });
	        return dfd.promise;
	}
	this.sendEmail = function(data){
		var dfd = $q.defer();
			var request = {};
	        request.method = "POST";
	        request.data = data;
	        request.url = serverUrl + "/users/send/email/user";  
	        $http(request).then(function (response) {
	         dfd.resolve(response);
	        }, function (error) {
	          dfd.error(error);
	        });
	        return dfd.promise;
	}
	this.sendEmailToAllUsers = function(data){
		var dfd = $q.defer();
			var request = {};
	        request.method = "POST";
	        request.data = data;
	        request.url = serverUrl + "/users/send/email/users";  
	        $http(request).then(function (response) {
	         dfd.resolve(response);
	        }, function (error) {
	          dfd.error(error);
	        });
	        return dfd.promise;
	}
})
.service("SuperAdminService",function($http, $location, $q,  serverUrl){
	this.login = function(admin){
		var dfd = $q.defer();
		var request = {};
        request.method = "POST";
        request.data = admin;
        request.url = serverUrl + "/superadmin/login";
         $http(request).then(function (response) {
          dfd.resolve(response);
        
        });
        return dfd.promise;
	}
	this.getSuperAdmin = function(admin)
	{
		var dfd = $q.defer();
		var request = {};
        request.method = "POST";
        request.data = admin;
        request.url = serverUrl + "/superadmin/admin";
         $http(request).then(function (response) {
          dfd.resolve(response);
        
        },function(error){
        	alert("Username does not exist");
        });
        return dfd.promise;
	}
	this.getAllAdmins = function(){
		var dfd = $q.defer();
		var request = {};
        request.method = "GET";
        request.url = serverUrl + "/admin";
        $http(request).then(function (response) {
          dfd.resolve(response);
        }, function (error) {
          dfd.error(error);
        });
        return dfd.promise;

	}
	this.deleteAdmin = function(admin){
		var dfd = $q.defer();
		var request = {};
        request.method = "DELETE";
        request.data = admin;
        request.url = serverUrl + "/admin";
        $http(request).then(function (response) {
          dfd.resolve(response);
        }, function (error) {
          dfd.error(error);
        });
        return dfd.promise;

	}
})
.service("ValidationService",function(){
	 this.validateEmail = function(email){
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        }


     this.validateIdNumber = function(id) {
        var tempDate = new Date(id.substring(0, 2), id.substring(2, 4) - 1, id.substring(4, 6));

        var date = tempDate.getDate();
        var month = tempDate.getMonth();
        var year = tempDate.getFullYear();


        var fullDate = date + "-" + month + 1 + "-" + year;
        // get the gender
        //        var genderCode = id.substring(6, 10);
        //        var gender = parseInt(genderCode) < 5000 ? "Female" : "Male";
        //
        // get country ID for citzenship
        //        var citzenship = parseInt(id.substring(10, 11)) == 0 ? "Yes" : "No";

        // apply Luhn formula for check-digits
        var tempTotal = 0;
        var checkSum = 0;
        var multiplier = 1;

        if (id.length != 13) {
            alert('ID number does not appear to be authentic - check length/characters');
            return false;
        } else if (!(tempDate.getYear() == id.substring(0, 2) && (month == id.substring(2, 4) - 1) && (date == id.substring(4, 6)))) {
           alert("ID number does not appear to be authentic - date part not valid");
            return false;
        } else if ((checkSum % 10) != 0) {
            alert("ID number does not appear to be authentic - check digit is not valid");
            return false;
        }
        return true;
    }
      this.validateNumber = function(number) {
        return /^\d+$/.test(number);
    }

     this.validateCellNumber = function (cell) {
        if (this.validateNumber(cell) && cell.length == 10) {

            return true;
        } else {
        	alert("Your contact number is invalid");
            return false;
        }
    }

  



})
.service("eventService",function($http, $location, $q,  serverUrl){

	this.addEvent = function(event){

		var dfd = $q.defer();
		var request = {};
        request.method = "PUT";
        request.data = event;
        request.url = serverUrl + "/events/create";
         $http(request).then(function (response) {
          dfd.resolve(response);
        
        },function(error){
        	alert("Bad thing happened lol...but check the internet connection");
        	$location.path('/superAdminLanding');
        });
        return dfd.promise;
	}
	this.getAllActiveEvents = function(){
		var dfd = $q.defer();
		var request = {};
        request.method = "GET";
        request.url = serverUrl + "/events/active";
         $http(request).then(function (response) {
          dfd.resolve(response);
        
        },function(error){
        	alert("Bad thing happened lol...but check the internet connection");
        	$location.path('/superAdminLanding');
        });
        return dfd.promise;
	}
	this.getAllDeactiveEvents = function(){
		var dfd = $q.defer();
		var request = {};
        request.method = "GET";
        request.url = serverUrl + "/events/notActive";
         $http(request).then(function (response) {
          dfd.resolve(response);
        
        },function(error){
        	alert("Bad thing happened lol...but check the internet connection");
        	$location.path('/superAdminLanding');
        });
        return dfd.promise;
	}
	this.delete = function(event){
		var dfd = $q.defer();
		var request = {};
        request.method = "DELETE";
        request.data = event;
        request.url = serverUrl + "/events/delete";
         $http(request).then(function (response) {
          dfd.resolve(response);
        
        },function(error){
        	alert("Bad thing happened lol...but check the internet connection");
        	$location.path('/superAdminLanding');
        });
        return dfd.promise;
	}

})
