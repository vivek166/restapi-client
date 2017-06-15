app.controller('dashboardCtrl', ['userInfo', '$scope', '$location', '$http', function(userInfo, $scope, $location, $http){

	var type = userInfo.getUser().user.type;
	if(type=='admin' || type=='Admin'){
		$scope.admin=true;
	}else{
		$scope.employee=true;
	}

	$scope.logout=function(){
		$http({
            method: "DELETE",
            url: "http://localhost:8080/projectmanagementapp/user/"+userInfo.getUser().user.id+"/deletetoken",
            headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+userInfo.getUser().token
                }
        }).then(function mySucces(response) {
        	console.log(response.data);
            $location.path('/home');
        }, function myError(response) {
             $location.path('/login');
        });
	}

     $scope.includeProfile=function(){
        $scope.profileTemplate="client/profile/profile.html";
    };
     $scope.includeProject=function(){
        $scope.prjectTemplate="client/project/project.html";
    };
     $scope.includeCompany=function(){
        $scope.companyTemplate="client/company/company.html";
    };
     $scope.includeEmployee=function(){
        $scope.employeeTemplate="client/employee/employee.html";
    };
     $scope.includeAssign=function(){
        $scope.assignTemplate="client/assign/assign.html";
    };
     $scope.includeTask=function(){
        $scope.taskTemplate="client/task/task.html";
    };
     $scope.includeNotification=function(){
        $scope.notificationTemplate="client/notification/notification.html";
    };
     $scope.includeTeam=function(){
        $scope.teamTemplate="client/team/team.html";
    };
	
}]);