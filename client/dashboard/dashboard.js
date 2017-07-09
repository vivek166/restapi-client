app.controller('dashboardCtrl', ['userInfo', '$scope', '$location', '$http', function(userInfo, $scope, $location, $http) {
    var type = userInfo.getUser().user.type;
    if (type == 'admin' || type == 'Admin') {
        $scope.admin = true;
    } else {
        $scope.employee = true;
    }
}]);