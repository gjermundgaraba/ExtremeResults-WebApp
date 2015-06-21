(function () {
    'use strict';

    angular
        .module('xr',
        [
            'ui.router',
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
        .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise("/overview");
            $stateProvider
                .state('overview', {
                    url: '/overview',
                    templateUrl: 'overview/overview.partial.html',
                    controller: 'OverviewController',
                    controllerAs: 'vm'
                })
                .state('daily-outcome', {
                    url: '/daily-outcome',
                    templateUrl: 'dailyOutcome/dailyOutcome.partial.html',
                    controller: 'DailyOutcomeController',
                    controllerAs: 'vm'
                })
                .state('monday-vision', {
                    url: '/monday-vision',
                    templateUrl: 'mondayVision/mondayVision.partial.html',
                    controller: 'MondayVisionController',
                    controllerAs: 'vm'
                })
                .state('weekly-reflection', {
                    url: '/weekly-reflection',
                    templateUrl: 'weeklyReflection/weeklyReflection.partial.html',
                    controller: 'WeeklyReflectionController',
                    controllerAs: 'vm'
                });
        }]);



})();