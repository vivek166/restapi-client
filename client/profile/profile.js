app.controller('profileCtrl', ['userInfo', '$scope', '$http', function(userInfo, $scope, $http){
	var getEmployee=function(){
	$http({
        method : "GET",
        url : "http://localhost:8080/projectmanagementapp/user/"+userInfo.getUser().id,
        headers: {
                    'Accept': 'application/json',
                    'authorization': 'Bearer d6101e8d-aeb2-467b-adb5-94276e508ec7'
                }
    }).then(function mySucces(response) {
        $scope.employees=response.data;
    }, function myError(response) {
        $scope.myWelcome = response.statusText;
    });
   }
   $scope.userName=userInfo.getUser().firstName;
   getEmployee();
}]);