app.controller('projectCtrl', function($scope, $http) {
    var pageNumber = 1;
    var start = 1;
    var size = 3;
    var content = "";
    $scope.detailsDivStatus = false;
    $scope.projectIdStatus = true;
    $scope.preBtnStatus = true;
    $scope.nextBtnStatus = true;


    var indexing = function(begin, end, total) {
        $scope.begin = begin;
        $scope.end = end;
        $scope.total = total;
    }


    var getProject = function(start, size, content, pageNumber) {
        $http({
            method: "GET",
            url: "http://localhost:8080/projectmanagementapp/project?start=" + start + "&size=" + size + "&query=" + content,
            headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer d6101e8d-aeb2-467b-adb5-94276e508ec7'
                }
        }).then(function mySucces(response) {
            $scope.projects = response.data.data;
            if (pageNumber > 1) {
                $scope.preBtnStatus = false;
            } else {
                $scope.preBtnStatus = true;
            }

            if (pageNumber < ((response.data.totalResult) / size)) {
                $scope.nextBtnStatus = false;
            } else {
                $scope.nextBtnStatus = true;
            }

            indexing(start + 1, start + response.data.data.length, response.data.totalResult);


        }, function myError(response) {
            $scope.myWelcome = response.statusText;
        });
    }

    $scope.getNextProject = function() {
        $scope.preBtnStatus = false;
        start = start + 1;
        pageNumber = pageNumber + 1;
        getProject((start - 1) * size, size, content, pageNumber);
    }

    $scope.getPreviousProject = function() {
        $scope.nextBtnStatus = false;
        pageNumber = pageNumber - 1;
        start = start - 1;
        getProject((start - 1) * size, size, content, pageNumber);
    }


    $scope.search = function(query) {
        pageNumber = 1;
        start = 1;
        size = 3;
        content = content + query;
        getProject((start - 1) * size, size, content, pageNumber);
    }




    $scope.save = function() {
        var saveStatus = confirm('Are you sure you want to save');
        if (saveStatus) {
            var project = {};
            project.projectTitle = $scope.projectTitle;
            project.projectFeature = $scope.projectFeature;
            project.projectDescription = $scope.projectDescription;
            project.technologyUsed = $scope.technologyUsed;

            $http({
                method: 'POST',
                url: 'http://localhost:8080/projectmanagementapp/project',
                data: project,
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function(data, status, headers, config) {
                alert("record saved");
                $scope.detailsDivStatus = false;
            })
        } else {
            alert('record not saved');
        }

    }

    $scope.update = function(projectId) {
        var saveStatus = confirm('Are you sure you want to update');
        if (saveStatus) {
            console.log(projectId+$scope.projectTitle+$scope.projectFeature+$scope.projectDescription+$scope.technologyUsed);
            var project = {};
            project.projectId = projectId;
            project.projectTitle = $scope.projectTitle;
            project.projectFeature = $scope.projectFeature;
            project.projectDescription = $scope.projectDescription;
            project.technologyUsed = $scope.technologyUsed;

            $http({
                method: 'PUT',
                url: 'http://localhost:8080/projectmanagementapp/project/' + projectId,
                data: project,
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function(data, status, headers, config) {
                alert("record updated");
                $scope.detailsDivStatus = false;
            })
        } else {
            alert("record could not be updated");
        }
    }




    var getDetail = function(projectId) {
        $scope.detailsDivStatus = true;
        $http({
            method: "GET",
            url: "http://localhost:8080/projectmanagementapp/project/" + projectId
        }).then(function mySucces(response) {
            $scope.project = response.data;
        }, function myError(response) {
            $scope.myWelcome = response.statusText;
        })
    }




    $scope.delete = function(projectId) {
        var deleteStatus = confirm('Are you sure you want to delete');
        if (deleteStatus) {
            $http({
                method: "DELETE",
                url: "http://localhost:8080/projectmanagementapp/project/" + projectId
            }).then(function mySucces(response) {
                alert("record deleted");
                getProject((start - 1) * size, size, content, pageNumber);
            }, function myError(response) {
                $scope.myWelcome = response.statusText;
            });
        } else {
            alert("record could not be deleted");
        }
    }




    $scope.showDetail = function(projectId) {
        $scope.projectIdStatus = true;
        $scope.saveBtnStatus = false;
        $scope.inputStatus = true;
        getDetail(projectId);
    }

    $scope.updateDetail = function(projectId) {
        $scope.saveBtnStatus = false;
        $scope.updateBtnStatus = true;
        $scope.projectIdStatus = false;
        $scope.inputStatus = false;
        getDetail(projectId);
    }

    $scope.addRecord = function() {
        $scope.saveBtnStatus = true;
        $scope.updateBtnStatus = false;
        $scope.projectIdStatus = false;
        $scope.inputStatus = false;
        $scope.detailsDivStatus = true;
        $scope.project={};
    }

    $scope.cancel = function() {
        var cancelStatus = confirm('Are you sure! you want to cancel');
        if (cancelStatus) {
            $scope.detailsDivStatus = false;
        } else {
            $scope.detailsDivStatus = true;
        }
    }


    //Execution start from here
    getProject((start - 1) * size, size, content, pageNumber);
});
