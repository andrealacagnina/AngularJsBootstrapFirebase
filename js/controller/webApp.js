var bookApp = angular.module('WebApp', ['ngRoute', 'ngSanitize', 'ngResource', 'firebase'])
        
        .config(function($routeProvider, $locationProvider){

            $routeProvider
            .when('/index.html', {
                controller: 'indexCrl',
                templateUrl: 'assets/partials/index.html'
            })
            .when('/', {
                controller: 'indexCrl',
                templateUrl: 'assets/partials/index.html'
            })
            .when('', {
                controller: 'indexCrl',
                templateUrl: 'assets/partials/index.html'
            })
            .when('/add-contact',{
                controller: 'addCtr',
                templateUrl: 'assets/partials/add.html'
            })
            .when('/contact/:name/:phone/:email?',{
                controller: 'contactCrl',
                templateUrl: 'assets/partials/contact.html'
            })
            .when('/contact/:id',{
                controller: 'contactCrl',
                templateUrl: 'assets/partials/contact.html'
            })
            .when('/404',{
                templateUrl: 'assets/partials/404.html'
            })
            .otherwise({
                redirectTo: '/404'
            });  
            
            $locationProvider.html5Mode(true);
            
            
        })
        

        
        
        

        
        

