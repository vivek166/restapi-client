app.controller('signupCtrl', ['$scope', '$http', '$location', 'userInfo', function($scope, $http, $location, userInfo){
	$scope.headerStatus=false;
	var uri = "http://localhost:8080/projectmanagementapp";
	$scope.signupUser=function(){
		if($scope.password==$scope.confirmPassword){
        var user={};
        user.firstName=$scope.firstName;
		user.lastName=$scope.lastName;
		user.companyName=$scope.companyName;
		user.email=$scope.email;
		user.mobile=$scope.mobile;
		user.type="admin";
		user.password=$scope.password;
			 $http({
                method: 'POST',
                url: uri+'/company',
                data: user,
                headers: {
                        'Content-Type': 'application/json'
                }
            }).then(function mySuccess(data, status, headers, config) {
            	//userInfo.setUser(data.data);
                $location.path('/login');
            }, function myError(response){
                alert("company or user already present");
            })
		}else{
			alert('user password must be match')
		}
		
	}

	$scope.cancel=function(){
		$location.path('/home');
	}
}]);