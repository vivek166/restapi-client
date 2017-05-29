app.controller('userSignupCtrl', function($scope, $http, $location){
	$scope.signupUser=function(){
        var user={};
		user.userName=$scope.firstName+" "+$scope.lastName;
		user.companyName=$scope.companyName;
		user.userId=$scope.emailId;
		if($scope.password==$scope.confirmPassword){
			user.userPassword=$scope.password+$scope.confirmPassword;
			save(user);
		}else{
			alert('user password must be match')
		}
	}
	var save =function(user){
		$http({
                method: 'POST',
                url: 'http://localhost:8080/projectmanagementapp/user',
                data: user,
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function(data, status, headers, config) {
                alert("record saved");
                $location.path('/');
            })
        }
});