app.controller('userSigninCtrl', function($scope, $http, $location){
	$scope.signinUser=function(){
		/*var credential={};
		credential.userName=$scope.userName;
		credential.userPassword=$scope.userPassword;
		$http({
                method: 'POST',
                url: 'http://localhost:8080/projectmanagementapp/employee/authentication',
                data: credential,
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function mySucces(response) {
                console.log(response.data.token);
                console.log(response.data.userName);
                var token=response.data.token;
                var userName=response.data.userName;
                $location.path('/project');
        }, function myError(response) {
           alert('userName or password wrong');
        });*/

         $location.path('/dashboard');
	}
});
