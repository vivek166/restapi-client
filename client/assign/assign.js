app.controller('assignCtrl', function($scope){
	$scope.assign=function(){
		var assign = {};
		assign.employeeId=$scope.employeeId;
		assign.projectId=$scope.projectId;
		assign.companyId=$scope.companyId;

		$http({
                method: 'POST',
                url: "http://localhost:8080/projectmanagementapp/user/"+$scope.employeeId+"/assignproject",
                data: assign,
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function(data, status, headers, config) {
                alert("project assigned successefully");
            });
	}
});