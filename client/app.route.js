var app = angular.module('myapp');
app.config(function($routeProvider, $locationProvider) {
    $routeProvider
    .when('/login', {
        templateUrl : '../client/login/login.html',
        controller : 'loginCtrl'
    })
    .when('/signup', {
        templateUrl : '../client/signup/signup.html',
        controller : 'signupCtrl'
    })
    .when('/project', {
        templateUrl : 'client/project/project.html',
        controller : 'projectCtrl'
    })
    .when('/employee', {
        templateUrl : 'client/employee/employee.html',
        controller : 'employeeCtrl'
    })
    .when('/dashboard', {
        templateUrl : 'client/dashboard/dashboard.html',
        controller : 'dashboardCtrl'
    })
    .when('/home', {
        templateUrl : 'client/home/home.html',
        controller : 'homeCtrl'
    })
    .when('/about', {
        templateUrl : 'client/about/about.html',
        controller : 'aboutCtrl'
    })
    .when('/contact', {
        templateUrl : 'client/contact/contact.html',
        controller : 'contactCtrl'
    })
    .otherwise({
    	redirectTo : '/home'
    });

    $locationProvider.html5Mode({enabled: true, requiredBase: false});
});
