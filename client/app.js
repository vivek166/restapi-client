var app = angular.module('myapp', ['ngRoute']);
app.config(function($routeProvider, $locationProvider) {
    $routeProvider
    .when('/', {
        templateUrl : '../client/view/user/user.signin.html',
        controller : 'userSigninCtrl'
    })
    .when('/signup', {
        templateUrl : '../client/view/user/user.signup.html',
        controller : 'userSignupCtrl'
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
