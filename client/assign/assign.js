app.controller('assignCtrl', function($scope, $http, userInfo){
	$scope.assign=function(){


    getUsers();
    getProjects();
		/*var assign = {};
		assign.employeeId=$scope.userId;
		assign.projectId=$scope.projectId;

		$http({
                method: 'POST',
                url: "http://localhost:8080/projectmanagementapp/user/"+$scope.employeeId+"/assignproject",
                data: assign,
                headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+userInfo.getUser().token
                }
            }).then(function(data, status, headers, config) {
                alert("project assigned successefully");
            });*/
	}


    var getProjects=function(){
        $http({
                method: 'GET',
                url: "http://localhost:8080/projectmanagementapp/project",
                data: assign,
                headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+userInfo.getUser().token
                }
            }).then(function mySucces(response) {
            $scope.projects = response.data.data;
            console.log(response.data.data);
        }, function myError(response) {
            $scope.myWelcome = response.statusText;
        });
    }
    var getUsers=function(){
        $http({
                method: 'GET',
                url: "http://localhost:8080/projectmanagementapp/user",
                data: assign,
                headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+userInfo.getUser().token
                }
            }).then(function mySucces(response) {
            $scope.users = response.data.data;
            console.log(response.data.data);
        }, function myError(response) {
            $scope.myWelcome = response.statusText;
        });
    }

   
});