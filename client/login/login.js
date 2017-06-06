app.controller('loginCtrl', function($scope, $http, $location){
	$scope.signinUser=function(){
		var credential={};
		credential.userName=$scope.userName;
		credential.userPassword=$scope.userPassword;
        $http({
                method: 'POST',
                url: 'http://localhost:8080/projectmanagementapp/employee/authentication',
                data: credential,
                headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer d6101e8d-aeb2-467b-adb5-94276e508ec7'
                }

        }).then(function mySucces(response) {
            console.log(response.data.userName);
            $location.path('/dashboard');
        })
        .catch(function myError(response) {
           alert('userName or password wrong');
        });
	}

    $scope.cancel=function(){
        $location.path('/home');
    }
});
