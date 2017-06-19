app.controller('dashboardCtrl', ['userInfo', '$scope', '$location', '$http', function(userInfo, $scope, $location, $http){

	var type = userInfo.getUser().user.type;
	if(type=='admin' || type=='Admin'){
		$scope.admin=true;
	}else{
		$scope.employee=true;
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
    $scope.includeProjects=function(){
        $scope.projectsTemplate="client/project/allprojects.html";
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