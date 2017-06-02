var app = angular.module('myapp', ['ngRoute']);
app.config(function($routeProvider, $locationProvider) {
    $routeProvider
    .when('/signin', {
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
    .when('/dashboard', {
        templateUrl : 'client/view/dashboard.html',
        controller : 'dashboardCtrl'
    })
    .otherwise({
    	redirectTo : '/signin'
    });

    $locationProvider.html5Mode({enabled: true, requiredBase: false});
});
