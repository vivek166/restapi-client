app.controller('profileCtrl', function($scope, $http){
	var getEmployee=function(){
	$http({
        method : "GET",
        url : "http://localhost:8080/projectmanagementapp/employee",
        headers: {
                    'Accept': 'application/json',
                    'authorization': 'Bearer d6101e8d-aeb2-467b-adb5-94276e508ec7'
                }
    }).then(function mySucces(response) {
        $scope.employees=response.data.data;
    }, function myError(response) {
        $scope.myWelcome = response.statusText;
    });
   }

   getEmployee();
});