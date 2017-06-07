app.controller('signupCtrl', ['$scope', '$http', '$location', 'userInfo', function($scope, $http, $location, userInfo){
	$scope.headerStatus=false;
		$scope.skills = [];
		$scope.addSkill = function() {
			if( $scope.newSkill){
					$scope.skills.push($scope.newSkill)
					$scope.newSkill = ''
			}
		}

		$scope.deleteSkill = function(index) {	
			$scope.skills.splice(index, 1);
		}

	$scope.signupUser=function(){
		if($scope.password==$scope.confirmPassword){
        var user={};
        user.firstName=$scope.firstName;
		user.lastName=$scope.lastName;
		user.companyName=$scope.companyName;
		user.email=$scope.email;
		user.skills=$scope.skills.toString();
		user.department=$scope.department;
		user.type=$scope.type;
		user.password=$scope.password;
			 $http({
                method: 'POST',
                url: 'http://localhost:8080/projectmanagementapp/user',
                data: user,
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function(data, status, headers, config) {
            	console.log(data.data);
            	userInfo.setUser(data.data);
                $location.path('/dashboard');
            })
		}else{
			alert('user password must be match')
		}
		
	}

	$scope.cancel=function(){
		$location.path('/home');
	}
}]);


