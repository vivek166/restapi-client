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
    .when('/user/project', {
        templateUrl : 'client/project/project.html',
        controller : 'projectCtrl'
    })
    .when('/user/projects', {
        templateUrl : 'client/project/allprojects.html',
        controller : 'allprojectCtrl'
    })
    .when('/user/employee', {
        templateUrl : 'client/employee/employee.html',
        controller : 'employeeCtrl'
    })
    .when('/user/company', {
        templateUrl : 'client/company/company.html',
        controller : 'companyCtrl'
    })
    .when('/user/profile', {
        templateUrl : 'client/profile/profile.html'
    })
    .when('/user/task', {
        templateUrl : 'client/task/task.html',
        controller : 'taskCtrl'
    })
    .when('/user/assign', {
        templateUrl : 'client/assign/assign.html',
        controller : 'assignCtrl'
    })
    .when('/user/notification', {
        templateUrl : 'client/notification/notification.html',
        controller : 'notificationCtrl'
    })
    .when('/user/team', {
        templateUrl : 'client/team/team.html',
        controller : 'teamCtrl'
    })
    .when('/user/account', {
        templateUrl : 'client/account/changePass.html',
        controller : 'changePassCtrl'
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


