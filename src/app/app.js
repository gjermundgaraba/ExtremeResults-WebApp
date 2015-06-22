(function () {
    'use strict';

    angular
        .module('xr',
        [
            'ui.router',
            'ngMaterial',
            'xr.header',
            'xr.navigation',
            'xr.templates', // gets made during build step (see gulpfile)
            'xr.createOutcome',
            'xr.createReflection',
            'xr.overview'
        ])
        .config(['ParseKeyServiceProvider', function(ParseKeyServiceProvider) {
            ParseKeyServiceProvider.applicationId = 'up5CMogFVZwyOSwLx7JljkinU6ZVyuUKM0asSK1P';
            ParseKeyServiceProvider.restApiKey = 'TtFcYgRiVB9PLPIbWhm4pBxRUwfRYup2mvCtUlZb';
        }])
        .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/overview');
            $stateProvider
                .state('overview', {
                    url: '/overview',
                    templateUrl: 'overview/overview.partial.html',
                    controller: 'OverviewController',
                    controllerAs: 'vm'
                })
                .state('daily-outcome', {
                    url: '/daily-outcome',
                    templateUrl: 'createOutcome/createOutcome.partial.html',
                    controller: 'CreateOutcomeController',
                    controllerAs: 'vm',
                    resolve: {
                        outcomeType: function () {
                            return 'DailyOutcome';
                        }
                    }
                })
                .state('monday-vision', {
                    url: '/monday-vision',
                    templateUrl: 'createOutcome/createOutcome.partial.html',
                    controller: 'CreateOutcomeController',
                    controllerAs: 'vm',
                    resolve: {
                        outcomeType: function () {
                            return 'MondayVision';
                        }
                    }
                })
                .state('weekly-reflection', {
                    url: '/weekly-reflection',
                    templateUrl: 'createReflection/createReflection.partial.html',
                    controller: 'CreateReflectionController',
                    controllerAs: 'vm',
                    resolve: {
                        reflectionType: function () {
                            return 'WeeklyReflection';
                        }
                    }
                });
        }])
        .controller('AppCtrl', ['$scope', '$mdSidenav', function($scope, $mdSidenav){
            $scope.toggleSidenav = function(menuId) {
                $mdSidenav(menuId).toggle();
            };

        }]);



})();