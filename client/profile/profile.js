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
        $scope.employees=response.data;
    }, function myError(response) {
        $scope.myWelcome = response.statusText;
    });
   }
   $scope.userName=userInfo.getUser().firstName;
   getEmployee();
}]);