var app = angular.module('myapp', ['ngRoute']);
app.config(function($routeProvider, $locationProvider) {
    $routeProvider
    .when('/', {
        templateUrl : '../client/home.html',
    })
    .when('/project', {
        templateUrl : 'client/view/project/project.html',
        controller : 'projectCtrl'
    })
    .when('/employee', {
        templateUrl : 'client/view/employee/employee.html',
        controller : 'employeeCtrl'
    })
    .otherwise({
    	redirectTo : '/'
    });

    $locationProvider.html5Mode({enabled: true, requiredBase: false});
});
