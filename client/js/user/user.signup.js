app.controller('userSignupCtrl', function($scope, $http, $location){
	$scope.signupUser=function(){
		var saveStatus = confirm('Are you sure you want to save');
        if (saveStatus) {
        var user={};
		user.userName=$scope.firstName+" "+$scope.lastName;
		user.companyName=$scope.companyName;
		user.userId=$scope.emailId;
		/*user.password=$scope.password;
		user.confirmPassword=$scope.confirmPassword;*/
		user.userPassword=$scope.password+$scope.confirmPassword

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
        } else {
            alert('record not saved');
        }
	}
});