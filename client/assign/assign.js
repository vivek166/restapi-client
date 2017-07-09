app.controller('assignCtrl', ['$scope', '$http', 'userInfo', function($scope, $http, userInfo) {
    var start = 0;
    var size = 3;
    var content = "";
    var userId;
    var projectId;
    $scope.selectedEmployeeName = "select employee name";
    $scope.selectedProjectName = "select project name";
    var uri = "http://localhost:8080/projectmanagementapp";
    $scope.assign = function() {
        $http({
            method: 'POST',
            url: uri + "/user/assignproject?userId=" + userId + "&projectId=" + projectId,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + userInfo.getUser().token
            }
        }).then(function mySucces(response) {
            $scope.userId = "";
            $scope.projectId = "";
            alert(response.data);
        }, function myError(response) {
            alert(response.data.errorMessage);
        });
    }

    var getProjects = function(start, size, content) {
        $http({
            method: 'GET',
            url: uri + "/project/filter?start=" + start + "&size=" + size + "&query=" + content,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + userInfo.getUser().token
            }
        }).then(function mySucces(response) {
            $scope.projects = response.data;
        }, function myError(response) {
            $scope.myWelcome = response.statusText;
        });
    }
    var getUsers = function(start, size, content) {
        $http({
            method: 'GET',
            url: uri + "/user/filter?start=" + start + "&size=" + size + "&query=" + content,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + userInfo.getUser().token
            }
        }).then(function mySucces(response) {
            $scope.users = response.data;
            if (content == "") {
                getProjects(start, size, content);
            }
        }, function myError(response) {
            $scope.myWelcome = response.statusText;
        });
    }

    $scope.refreshEmployeeId = function() {
        content = $scope.searchEmployee;
        getUsers(start, size, content);
    }
    $scope.refreshProjectId = function() {
        content = $scope.searchProject;
        getProjects(start, size, content);
    }

    $scope.getUserId = function(user) {
        $scope.selectedUserId = user.id;
        userId = user.id;
        $scope.selectedEmployeeName = user.firstName + " " + user.lastName + "(" + user.email + ")";
    }

    $scope.getProjectId = function(project) {
        $scope.selectedProjectId = project.projectId;
        projectId = project.projectId;
        $scope.selectedProjectName = project.projectTitle;
    }

    getUsers(start, size, content);

}]);