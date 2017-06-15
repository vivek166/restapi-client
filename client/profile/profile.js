app.controller('profileCtrl', ['userInfo', '$scope', '$http', '$location', function(userInfo, $scope, $http, $location){
    $scope.inputStatus=true;
	var getEmployee=function(){
	$http({
        method : "GET",
        url : "http://localhost:8080/projectmanagementapp/user/"+userInfo.getUser().user.id,
        headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+userInfo.getUser().token
                }
    }).then(function mySucces(response) {
        console.log(userInfo.getUser());
        $scope.employee=response.data;
        $scope.userName=response.data.firstName+" "+ response.data.lastName;
    }, function myError(response) {
        $scope.myWelcome = response.statusText;
    });
   }
   $scope.userName=userInfo.getUser().firstName;
  

   $scope.changePassword=function(){
     var changeStatus = confirm('Are you sure you want to update');
     if(changeStatus){
        if($scope.newPassword==$scope.cnfrmPassword){
        var password={};
        password.oldPassword=$scope.oldPassword;
        password.newPassword=$scope.newPassword;
        password.userName=userInfo.getUser().user.email;

    $http({
                method: 'POST',
                url: 'http://localhost:8080/projectmanagementapp/user/changepassword?username='+userInfo.getUser().user.email,
                data: password,
                headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+userInfo.getUser().token
                }
            }).then(function mySucces(response) {
                alert("password changed");
        }, function myError(response) {
           alert("password  can not changed");
        });
    }else{
        alert("password not matched");
    }
}else{
        $scope.oldPassword="";
        $scope.newPassword="";
        $scope.cnfrmPassword="";
    }
   }

   $scope.update=function(empId){
    $scope.inputStatus=true;
    var saveStatus = confirm('Are you sure you want to update');
        if (saveStatus) {
           var employee = {};
            employee.empId = user.getUser().user.id;
            employee.firstName = $scope.fName;
            employee.lastName = $scope.lName;
            employee.mobile = $scope.mobile;
            employee.skills = $scope.skills;
            employee.type = $scope.type;

            $http({
                method: 'PUT',
                url: 'http://localhost:8080/projectmanagementapp/user/' + empId,
                data: employee,
                headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+userInfo.getUser().token
                }
            }).then(function(data, status, headers, config) {
                alert("record updated");
                $scope.detailsDivStatus = false;
            })
        } else {
            alert("record could not be updated");
        }
   }

   $scope.logout=function(){
        $http({
            method: "DELETE",
            url: "http://localhost:8080/projectmanagementapp/user/"+userInfo.getUser().user.id+"/deletetoken",
            headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+userInfo.getUser().token
                }
        }).then(function mySucces(response) {
            console.log(response.data);
            $location.path('/home');
        }, function myError(response) {
             $location.path('/login');
        });
    }
    getEmployee();
}]);

