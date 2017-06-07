app.controller('companyCtrl', function($scope, $http) {
    var pageNumber = 1;
    var start = 1;
    var size = 3;
    var content = "";
    $scope.detailsDivStatus = false;
    $scope.companyIdStatus = true;
    $scope.preBtnStatus = true;
    $scope.nextBtnStatus = true;


    var indexing = function(begin, end, total) {
        $scope.begin = begin;
        $scope.end = end;
        $scope.total = total;
    }


    var getCompany = function(start, size, content, pageNumber) {
        $http({
            method: "GET",
            url: "http://localhost:8080/projectmanagementapp/company?start=" + start + "&size=" + size + "&query=" + content,
            headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer d6101e8d-aeb2-467b-adb5-94276e508ec7'
                }
        }).then(function mySucces(response) {
            $scope.companys = response.data.data;
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

    $scope.getNextCompany = function() {
        $scope.preBtnStatus = false;
        start = start + 1;
        pageNumber = pageNumber + 1;
        getCompany((start - 1) * size, size, content, pageNumber);
    }

    $scope.getPreviousCompany = function() {
        $scope.nextBtnStatus = false;
        pageNumber = pageNumber - 1;
        start = start - 1;
        getCompany((start - 1) * size, size, content, pageNumber);
    }


    $scope.search = function(query) {
        pageNumber = 1;
        start = 1;
        size = 3;
        content = content + query;
        getCompany((start - 1) * size, size, content, pageNumber);
    }




    $scope.save = function() {
        var saveStatus = confirm('Are you sure you want to save');
        if (saveStatus) {
            var company = {};
            company.companyName = $scope.companyName;
            company.companyContactNumber = $scope.companyContactNumber;
            company.companyAddress = $scope.companyAddress;

            $http({
                method: 'POST',
                url: 'http://localhost:8080/companymanagementapp/company',
                data: company,
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

    $scope.update = function(companyId) {
        var saveStatus = confirm('Are you sure you want to update');
        if (saveStatus) {
            var company = {};
            company.companyName = $scope.companyName;
            company.companyContactNumber = $scope.companyContactNumber;
            company.companyAddress = $scope.companyAddress;

            $http({
                method: 'PUT',
                url: 'http://localhost:8080/projectmanagementapp/company/' + companyId,
                data: company,
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




    var getDetail = function(companyId) {
        $scope.detailsDivStatus = true;
        $http({
            method: "GET",
            url: "http://localhost:8080/projectmanagementapp/company/" + companyId
        }).then(function mySucces(response) {
            $scope.company = response.data;
        }, function myError(response) {
            $scope.myWelcome = response.statusText;
        })
    }




    $scope.delete = function(companyId) {
        var deleteStatus = confirm('Are you sure you want to delete');
        if (deleteStatus) {
            $http({
                method: "DELETE",
                url: "http://localhost:8080/projectmanagementapp/company/" + companyId
            }).then(function mySucces(response) {
                alert("record deleted");
                getCompany((start - 1) * size, size, content, pageNumber);
            }, function myError(response) {
                $scope.myWelcome = response.statusText;
            });
        } else {
            alert("record could not be deleted");
        }
    }




    $scope.showDetail = function(companyId) {
        $scope.companyIdStatus = true;
        $scope.saveBtnStatus = false;
        $scope.inputStatus = true;
        getDetail(companyId);
    }

    $scope.updateDetail = function(companyId) {
        $scope.saveBtnStatus = false;
        $scope.updateBtnStatus = true;
        $scope.companyIdStatus = false;
        $scope.inputStatus = false;
        getDetail(companyId);
    }

    $scope.addRecord = function() {
        $scope.saveBtnStatus = true;
        $scope.updateBtnStatus = false;
        $scope.companyIdStatus = false;
        $scope.inputStatus = false;
        $scope.detailsDivStatus = true;
        $scope.company={};
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
    getCompany((start - 1) * size, size, content, pageNumber);
});
