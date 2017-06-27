app.controller('taskCtrl', function($http, $scope, projectDetails, userInfo){
	$scope.detailsDivStatus=false;
	$scope.inputStatus=true;
    var uri = "http://localhost:8080/projectmanagementapp";
	var getProject = function() {
        $http({
            method: "GET",
            url: uri+"/user/"+userInfo.getUser().user.id+"/assignedproject",
            headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+userInfo.getUser().token
                }
        }).then(function mySucces(response) {
            $scope.projects = response.data;
            console.log(response.data[0]);
            projectDetails.setProjectDtails(response.data[0]);
        }, function myError(response) {
            $scope.myWelcome = response.statusText;
        });
    }

     $scope.getDetail = function(projectId) {
        $scope.project = projectDetails.getProjectDetails();
        $scope.detailsDivStatus=true;
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