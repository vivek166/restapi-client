app.controller('dashboardCtrl', ['userInfo', '$scope', '$location', '$http', function(userInfo, $scope, $location, $http){
	$scope.common=true;
	var type = userInfo.getUser().type;

	if(type=='admin'){
		$scope.admin=true;
	}else{
		$scope.employee=true;
	}

	$scope.logout=function(){
		$http({
            method: "DELETE",
            url: "http://localhost:8080/projectmanagementapp/user/"+userInfo.getUser().id+"/deletetoken",
            headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer d6101e8d-aeb2-467b-adb5-94276e508ec7'
                }
        }).then(function mySucces(response) {
        	console.log(response.data);
            $location.path('/home');
        }, function myError(response) {
             $location.path('/login');
        });
	}
	
}]);