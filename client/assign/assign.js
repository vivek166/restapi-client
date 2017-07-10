app.controller('assignCtrl', ['$scope', '$http', 'userInfo', function($scope, $http, userInfo) {
    var start = 0;
    var size = 3;
    var content = "";
    var userId = 0;
    var projectId = 0;
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

    var getProjects = function(start, size, content, userId) {
        $http({
            method: 'GET',
            url: uri + "/project/filter?start=" + start + "&size=" + size + "&query=" + content + "&userId=" + userId,
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
    var getUsers = function(start, size, content, projectId) {
        $http({
            method: 'GET',
            url: uri + "/user/filter?start=" + start + "&size=" + size + "&query=" + content + "&projectId=" + projectId,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + userInfo.getUser().token
            }
        }).then(function mySucces(response) {
            $scope.users = response.data;
            if (content == "" && projectId ==0) {
                getProjects(start, size, content, userId);
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
        getProjects(start, size, content, userId);
    }

    $scope.getProjectId = function(project) {
        $scope.selectedProjectId = project.projectId;
        projectId = project.projectId;
        $scope.selectedProjectName = project.projectTitle;
        getUsers(start, size, content, projectId);
    }

    getUsers(start, size, content, projectId);

}]);