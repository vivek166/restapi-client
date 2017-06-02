app.controller('employeeCtrl', function($scope, $http) {
	var pageNumber=1;
    var start=1;
    var size=3;
    var content="";
    $scope.detailsDivStatus = false;
    $scope.empIdStatus = true;
    $scope.preBtnStatus = true;
    $scope.nextBtnStatus = true;


    var indexing=function(begin , end, total){
        $scope.begin=begin;
        $scope.end=end;
        $scope.total=total;
    }

    var getEmployee=function(start, size, content, pageNumber){
	$http({
        method : "GET",
        url : "http://localhost:8080/projectmanagementapp/employee?start="+start+"&size="+size+"&query="+content,
        headers : {'Authorization' : 'h1llifm1cg8tig0cv90lb8bjjk'}
    }).then(function mySucces(response) {
        $scope.employees=response.data.data;
        if(pageNumber>1){
         $scope.preBtnStatus=false;
       }else{
         $scope.preBtnStatus=true;
       }
      
       if(pageNumber<((response.data.totalResult)/size)){
         $scope.nextBtnStatus=false;
       }else{
         $scope.nextBtnStatus=true;
       }

       indexing(start+1, start+response.data.data.length, response.data.totalResult);

       
    }, function myError(response) {
        $scope.myWelcome = response.statusText;
    });
   }
	
	$scope.getNextEmployee=function(){
		 $scope.preBtnStatus=false;
         start=start+1;
         pageNumber=pageNumber+1;
         getEmployee((start-1)*size , size, content, pageNumber);
	}

	$scope.getPreviousEmployee=function(){
		$scope.nextBtnStatus=false;
         pageNumber=pageNumber-1;
         start=start-1;
         getEmployee((start-1)*size , size, content, pageNumber);
	}

    $scope.search = function(query) {
        pageNumber = 1;
        start = 1;
        content = content + query;
        getEmployee((start - 1) * size, size, content, pageNumber);
    }



	var getDetail=function(empId){
        $scope.detailsDivStatus=true;
		$http({
        method : "GET",
        url : "http://localhost:8080/projectmanagementapp/employee/"+empId
    }).then(function mySucces(response) {
        $scope.employee = response.data;
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
        $scope.employee={};
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
            employee.empId = $scope.empId;
            employee.empName = $scope.empName;
            employee.empDepartment = $scope.empDepartment;
            employee.empSubjects = $scope.empSubjects;
            employee.employeeType = $scope.employeeType;
            $http({
                method: 'POST',
                url: 'http://localhost:8080/projectmanagementapp/employee',
                data: employee,
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

    $scope.update = function(empId) {
        var saveStatus = confirm('Are you sure you want to update');
        if (saveStatus) {
           var employee = {};
            employee.empId = empId;
            employee.empName = $scope.empName;
            employee.empDepartment = $scope.empDepartment;
            employee.empSubjects = $scope.empSubjects;
            employee.employeeType = $scope.employeeType;

            $http({
                method: 'PUT',
                url: 'http://localhost:8080/projectmanagementapp/employee/' + empId,
                data: employee,
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

    $scope.delete = function(empId) {
        var deleteStatus = confirm('Are you sure you want to delete');
        if (deleteStatus) {
            $http({
                method: "DELETE",
                url: "http://localhost:8080/projectmanagementapp/employee/" + empId
            }).then(function mySucces(response) {
                alert("record deleted");
                getEmployee((start - 1) * size, size, content, pageNumber);
            }, function myError(response) {
                $scope.myWelcome = response.statusText;
            });
        } else {
            alert("record could not be deleted");
        }
    }


   getEmployee((start-1)*size , size, content, pageNumber);
});
