app.controller('loginCtrl', function($scope, $http, $location, userInfo){
	$scope.signinUser=function(){
		var credential={};
		credential.userName=$scope.userName;
		credential.userPassword=$scope.userPassword;
        $http({
                method: 'POST',
                url: 'http://localhost:8080/projectmanagementapp/user/authentication',
                data: credential,
                headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer d6101e8d-aeb2-467b-adb5-94276e508ec7'
                }

        }).then(function mySucces(response) {
            userInfo.setUser(response.data.user);
            $location.path('/dashboard');
        })
        .catch(function myError(response) {
           alert('userName or password wrong');
        });
	}

    

    $scope.cancel=function(){
        $location.path('/home');
    }
})
.service('userInfo', function(){
                this.getUser=function(){
                    return this.user;
                }
                this.setUser=function(user){
                    this.user=user;
                }
            });