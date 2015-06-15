(function () {
    'use strict';

    angular
        .module('xr',
        [
            'ngRoute',
            'xr.header',
            'xr.navigation',
            'xr.templates', // gets made during build step (see gulpfile)
            'xr.dailyOutcome',
            'xr.mondayVision',
            'xr.weeklyReflection',
            'xr.overview'
        ])
        .config(['ParseKeyServiceProvider', function(ParseKeyServiceProvider) {
            ParseKeyServiceProvider.applicationId = 'up5CMogFVZwyOSwLx7JljkinU6ZVyuUKM0asSK1P';
            ParseKeyServiceProvider.restApiKey = 'TtFcYgRiVB9PLPIbWhm4pBxRUwfRYup2mvCtUlZb';
        }])
        .config(['$routeProvider', function($routeProvider) {
            $routeProvider
                .when('/overview', {
                    templateUrl: 'overview/overview.partial.html',
                    controller: 'OverviewController',
                    controllerAs: 'vm'
                })
                .when('/daily-outcome', {
                    templateUrl: 'dailyOutcome/dailyOutcome.partial.html',
                    controller: 'DailyOutcomeController',
                    controllerAs: 'vm'
                })
                .when('/monday-vision', {
                    templateUrl: 'mondayVision/mondayVision.partial.html',
                    controller: 'MondayVisionController',
                    controllerAs: 'vm'
                })
                .when('/weekly-reflection', {
                    templateUrl: 'weeklyReflection/weeklyReflection.partial.html',
                    controller: 'WeeklyReflectionController',
                    controllerAs: 'vm'
                })
                .otherwise({
                    redirectTo: '/overview'
                });
        }]);



})();