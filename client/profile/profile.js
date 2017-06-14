app.controller('profileCtrl', ['userInfo', '$scope', '$http', function(userInfo, $scope, $http){
	var getEmployee=function(){
	$http({
        method : "GET",
        url : "http://localhost:8080/projectmanagementapp/user/"+userInfo.getUser().user.id,
        headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+userInfo.getUser().token
                }
    }).then(function mySucces(response) {
        console.log(userInfo.getUser());
        $scope.employees=response.data;
        $scope.userName=response.data.firstName+" "+ response.data.lastName;
    }, function myError(response) {
        $scope.myWelcome = response.statusText;
    });
   }
   $scope.userName=userInfo.getUser().firstName;
   getEmployee();
}]);