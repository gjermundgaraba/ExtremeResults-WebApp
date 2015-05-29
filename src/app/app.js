(function () {
    'use strict';

    angular
        .module('xr',
        [
            'ngRoute',
            'xr.templates',
            'xr.dailyOutcomes',
            'xr.mondayVision'
        ])
        .config(['ParseKeyServiceProvider', function(ParseKeyServiceProvider) {
            ParseKeyServiceProvider.applicationId = 'up5CMogFVZwyOSwLx7JljkinU6ZVyuUKM0asSK1P';
            ParseKeyServiceProvider.restApiKey = 'TtFcYgRiVB9PLPIbWhm4pBxRUwfRYup2mvCtUlZb';
        }])
        .config(['$routeProvider', function($routeProvider) {
            $routeProvider.
                when('/daily-outcomes', {
                    templateUrl: 'dailyOutcomes/dailyOutcomes.partial.html',
                    controller: 'DailyOutcomesController',
                    controllerAs: 'vm'
                }).
                when('/monday-vision', {
                    templateUrl: 'mondayVision/mondayVision.partial.html',
                    controller: 'MondayVisionController',
                    controllerAs: 'vm'
                }).
                otherwise({
                    redirectTo: '/daily-outcomes'
                });
        }]);



})();