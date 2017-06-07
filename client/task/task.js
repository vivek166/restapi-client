app.controller('taskCtrl', function($http, $scope, projectDetails, userInfo){
	$scope.detailsDivStatus=false;
	$scope.inputStatus=true;
	var getProject = function() {
        $http({
            method: "GET",
            url: "http://localhost:8080/projectmanagementapp/user/"+userInfo.getUser().id+"/assignedproject",
            headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer d6101e8d-aeb2-467b-adb5-94276e508ec7'
                }
        }).then(function mySucces(response) {
            $scope.projects = response.data;
            projectDetails.setProjectDtails(response.data);
        }, function myError(response) {
            $scope.myWelcome = response.statusText;
        });
    }

     $scope.getDetail = function() {
        $scope.project = projectDetails.getProjectDetails();
    }
    getProject();
})
.service('projectDetails', function(){
	this.setProjectDtails=function(project){
		this.project=project;
	}
	this.getProjectDetails=function(){
		return this.project;
	}
});