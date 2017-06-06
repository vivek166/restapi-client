var app = angular.module('myapp');
app.config(function($routeProvider, $locationProvider, $httpProvider) {
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

    $httpProvider.defaults.headers.post["Content-Type"] = "application/json";
    $httpProvider.defaults.headers.post["Authorization"] = "Bearer d6101e8d-aeb2-467b-adb5-94276e508ec7";

});


