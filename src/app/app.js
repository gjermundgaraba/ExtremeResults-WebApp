(function () {
    'use strict';

    angular
        .module('xr',
        [
            'ui.router',
            'ngMaterial',
            'ngCookies',
            'xr.auth',
            'xr.header',
            'xr.navigation',
            'xr.templates', // gets made during build step (see gulpfile)
            'xr.createOutcome',
            'xr.createReflection',
            'xr.overview'
        ])
        .config(['ParseKeyServiceProvider', function(ParseKeyServiceProvider) {
            ParseKeyServiceProvider.applicationId = '<!APPLICATION-ID!>';
            ParseKeyServiceProvider.restApiKey = '<!REST-API-KEY!>';
        }])
        .run(['$rootScope', '$mdDialog', '$state', function run($rootScope, $mdDialog, $state) {
            $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
                if (typeof $rootScope.currentUser === 'undefined') {
                    event.preventDefault();
                    $mdDialog
                        .show({
                            controller: 'LoginModalController',
                            controllerAs: 'vm',
                            templateUrl: 'auth/loginModal/loginModal.partial.html'
                        })
                        .then(function() {
                            $state.go(toState, toParams);
                        });
                }
            });
        }])
        .config(['$stateProvider',
                '$urlRouterProvider',
                'CoreTypes', function($stateProvider, $urlRouterProvider, CoreTypes) {
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
                            return CoreTypes.dailyOutcome;
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
                            return CoreTypes.mondayVision;
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
                            return CoreTypes.weeklyReflection;
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