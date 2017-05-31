app.controller('userSignupCtrl', ['$scope', function($scope, $http, $location){
		$scope.skills = [];
		$scope.addSkill = function() {
			if( $scope.newSkill){
					$scope.skills.push({'title': $scope.newSkill})
					$scope.newSkill = ''
			}
		}

		$scope.deleteSkill = function(index) {	
			$scope.skills.splice(index, 1);
		}

	$scope.signupUser=function(){
        var user={};
        user.firstName=$scope.firstName;
		user.lastName=$scope.lastName;
		user.companyName=$scope.companyName;
		user.email=$scope.email;
		user.technologies=$scope.skills;
		user.department=$scope.department;
		user.type=$scope.type;
		
		if($scope.password==$scope.confirmPassword){
			user.password=$scope.password;
			save(user);
		}else{
			alert('user password must be match')
		}
		console.log($scope.firstName+$scope.lastName+$scope.companyName+$scope.email+$scope.password+skills+$scope.department+$scope.type);
	}
	var save =function(user){
		$http({
                method: 'POST',
                url: 'http://localhost:8080/projectmanagementapp/employee',
                data: user,
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function(data, status, headers, config) {
                alert("record saved");
                $location.path('/');
            })
        }
}]);