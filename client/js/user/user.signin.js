app.controller('userSigninCtrl', function($scope, $http, $location){
	$scope.signinUser=function(){
		var credential={};
		credential.userName=$scope.userName;
		credential.userPassword=$scope.userPassword;
		$http({
                method: 'POST',
                url: 'http://localhost:8080/projectmanagementapp/employee/authentication',
                data: credential,
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function(data, status, headers, config) {
                $location.path('/project');
            })
	}
});
