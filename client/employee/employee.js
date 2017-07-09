app.controller('employeeCtrl', function($scope, $http, userInfo) {
    var pageNumber = 1;
    var start = 1;
    var size = 3;
    var content = "";
    var uri = "http://localhost:8080/projectmanagementapp";
    $scope.detailsDivStatus = false;
    $scope.empIdStatus = true;
    $scope.preBtnStatus = true;
    $scope.nextBtnStatus = true;

    var indexing = function(begin, end, total) {
        $scope.begin = begin;
        $scope.end = end;
        $scope.total = total;
    }

    var getEmployee = function(start, size, content, pageNumber) {
        $http({
            method: "GET",
            url: uri + "/user?start=" + start + "&size=" + size + "&query=" + content,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + userInfo.getUser().token
            }
        }).then(function mySucces(response) {
            $scope.employees = response.data.data;
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

    $scope.getNextEmployee = function() {
        $scope.preBtnStatus = false;
        start = start + 1;
        pageNumber = pageNumber + 1;
        getEmployee((start - 1) * size, size, content, pageNumber);
    }

    $scope.getPreviousEmployee = function() {
        $scope.nextBtnStatus = false;
        pageNumber = pageNumber - 1;
        start = start - 1;
        getEmployee((start - 1) * size, size, content, pageNumber);
    }

    $scope.search = function(query) {
        pageNumber = 1;
        start = 1;
        content = content + query;
        getEmployee((start - 1) * size, size, content, pageNumber);
        content = "";
    }



    var getDetail = function(empId) {
        $scope.detailsDivStatus = true;
        $http({
            method: "GET",
            url: uri + "/user/" + empId,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + userInfo.getUser().token
            }
        }).then(function mySucces(response) {
            console.log(response);
            $scope.employee = response.data;
            getProject(empId);
        }, function myError(response) {
            $scope.myWelcome = response.statusText;
        });
    }



    $scope.showDetail = function(empId) {
        $scope.empIdStatus = true;
        $scope.saveBtnStatus = false;
        $scope.updateBtnStatus = false;
        $scope.inputStatus = true;
        getDetail(empId);
    }

    $scope.updateDetail = function(empId) {
        $scope.saveBtnStatus = false;
        $scope.updateBtnStatus = true;
        $scope.empIdStatus = false;
        $scope.inputStatus = false;
        getDetail(empId);
    }

    $scope.addRecord = function() {
        $scope.saveBtnStatus = true;
        $scope.updateBtnStatus = false;
        $scope.empIdStatus = false;
        $scope.inputStatus = false;
        $scope.detailsDivStatus = true;
        $scope.employee = {};
    }

    $scope.cancel = function() {
        var cancelStatus = confirm('Are you sure! you want to cancel');
        if (cancelStatus) {
            $scope.detailsDivStatus = false;
        } else {
            $scope.detailsDivStatus = true;
        }
    }

    $scope.save = function() {
        var saveStatus = confirm('Are you sure you want to save');
        if (saveStatus) {
            var employee = {};
            employee.firstName = $scope.firstName;
            employee.lastName = $scope.lastName;
            employee.email = $scope.email;
            employee.mobile = $scope.mobile;
            employee.password = $scope.password;
            employee.type = "employee";
            $http({
                method: 'POST',
                url: uri + '/user',
                data: employee,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + userInfo.getUser().token
                }
            }).then(function mySuccess(data, status, headers, config) {
                $scope.firstName = "";
                $scope.lastName = "";
                $scope.email = "";
                $scope.mobile = "";
                $scope.password = "";
                $scope.detailsDivStatus = false;
                getEmployee((start - 1) * size, size, content, pageNumber);
                alert("record saved");
            }, function myError(response) {
                alert(response.data.errorMessage);
            })
        } else {
            alert('record not saved');
        }

    }

    $scope.update = function(empId) {
        var saveStatus = confirm('Are you sure you want to update');
        if (saveStatus) {
            var employee = {};
            employee.empId = userInfo.getUser().user.id;
            employee.firstName = $scope.firstName;
            employee.lastName = $scope.lastName;
            employee.mobile = $scope.mobile;
            employee.type = "employee";
            employee.company = userInfo.getUser().user.company;

            $http({
                method: 'PUT',
                url: uri + '/user/' + empId,
                data: employee,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + userInfo.getUser().token
                }
            }).then(function(data, status, headers, config) {
                getEmployee((start - 1) * size, size, content, pageNumber);
                $scope.detailsDivStatus = false;
                alert("record updated");
            })
        } else {
            alert("record could not be updated");
        }
    }

    $scope.delete = function(empId) {
        var deleteStatus = confirm('Are you sure you want to delete');
        if (deleteStatus) {
            $http({
                method: "DELETE",
                url: uri + "/user/" + empId,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + userInfo.getUser().token
                }
            }).then(function mySucces(response) {
                getEmployee((start - 1) * size, size, content, pageNumber);
                alert("record deleted");
            }, function myError(response) {
                alert(response.data.errorMessage);
                $scope.myWelcome = response.statusText;
            });
        } else {
            alert("record could not be deleted");
        }
    }


    var getProject = function(userid) {
        $http({
            method: "GET",
            url: uri + "/user/" + userid + "/assignedproject",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + userInfo.getUser().token
            }
        }).then(function mySucces(response) {
            $scope.assignedProjects = response.data;
            console.log(response.data[0]);
        }, function myError(response) {
            $scope.myWelcome = response.statusText;
        });
    }

    $scope.unAssignProject = function(projectId, userId) {
        $http({
            method: "DELETE",
            url: uri + "/project/" + projectId + "/unassign/" + userId,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + userInfo.getUser().token
            }
        }).then(function mySucces(response) {
            $scope.message = response.data;
            console.log($scope.message);
        }, function myError(response) {
            $scope.myWelcome = response.statusText;
        });
    }


    getEmployee((start - 1) * size, size, content, pageNumber);
});