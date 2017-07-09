app.controller('loginCtrl', function($scope, $http, $location, userInfo) {
        var uri = "http://localhost:8080/projectmanagementapp";
        $scope.signinUser = function() {
            var credential = {};
            credential.userName = $scope.userName;
            credential.userPassword = $scope.userPassword;
            $http({
                    method: 'POST',
                    url: uri + '/user/authentication',
                    data: credential
                }).then(function mySucces(response) {
                    userInfo.setUser(response.data);
                    $location.path('/user/profile');
                })
                .catch(function myError(response) {
                    alert('userName or password wrong');
                });
        }



        $scope.cancel = function() {
            $location.path('/home');
        }
    })
    .service('userInfo', function() {
        this.getUser = function() {
            return this.user;
        }
        this.setUser = function(user) {
            this.user = user;
        }
    });