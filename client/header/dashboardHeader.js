app.controller('dashboardHeaderCtrl', function($scope, $http, userInfo, $location) {
    var uri = "http://localhost:8080/projectmanagementapp";
    $scope.logout = function() {
        $http({
            method: "DELETE",
            url: uri + "/user/" + userInfo.getUser().user.id + "/deletetoken",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + userInfo.getUser().token
            }
        }).then(function mySucces(response) {
            console.log(response.data);
            $location.path('/home');
        }, function myError(response) {
            $location.path('/login');
        });
    }
});