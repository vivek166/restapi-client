app.controller('userSigninCtrl', function($scope, $http, $location){
	$scope.signinUser=function(){
		/*$scope.userId=$scope.userId;
		$scope.userPassword=$scope.userPassword;*/

		var user={};
		user.userId=$scope.userId;
		user.userPassword=$scope.userPassword;

		$http({
                method: 'POST',
                url: 'http://localhost:8080/projectmanagementapp/user/userAuth',
                data: user,
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function(data, status, headers, config) {
                $location.path('/project');
            })
	}
});
