app.controller('assignCtrl', function($scope, $http, userInfo){
	$scope.assign=function(){
		$http({
                method: 'POST',
                url: "http://localhost:8080/projectmanagementapp/user/assignproject?userId="+$scope.userId+"&projectId="+$scope.projectId,
                headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+userInfo.getUser().token
                }
            }).then(function mySucces(response) {
            alert("project assigned successefully");
        }, function myError(response) {
           alert("project can not assigned");
        });
	   }


    var getProjects=function(){
        $http({
                method: 'GET',
                url: "http://localhost:8080/projectmanagementapp/project/filter",
                headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+userInfo.getUser().token
                }
            }).then(function mySucces(response) {
            $scope.projects = response.data;
        }, function myError(response) {
            $scope.myWelcome = response.statusText;
        });
    }
    var getUsers=function(){
        $http({
                method: 'GET',
                url: "http://localhost:8080/projectmanagementapp/user/filter?query=employee",
                headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+userInfo.getUser().token
                }
            }).then(function mySucces(response) {
                $scope.users=response.data;
        }, function myError(response) {
            $scope.myWelcome = response.statusText;
        });
    }

    $scope.refreshEmployeeId=function(){
        getUsers();
    }
    $scope.refreshProjectId=function(){
        getProjects();
    }
    
});