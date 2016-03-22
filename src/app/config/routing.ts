(function () {
    'use strict';

    angular.module('xr.config')
        .config(['$stateProvider', '$urlRouterProvider', 'CoreTypes', function($stateProvider, $urlRouterProvider, CoreTypes) {
            $urlRouterProvider.otherwise(function($injector) {
                var $state = $injector.get('$state');
                $state.go('app.overview');
            });

            $stateProvider
                .state('login', {
                    url: '/login',
                    templateUrl: 'login/login.partial.html',
                    controller: 'LoginController',
                    controllerAs: '$ctrl'
                })
                .state('register', {
                    url: '/register',
                    templateUrl: 'register/register.partial.html',
                    controller: 'RegisterController',
                    controllerAs: '$ctrl'
                })
                .state('app', {
                    url: '',
                    templateUrl: 'app.html'
                })
                .state('app.overview', {
                    url: '/overview',
                    templateUrl: 'overview/overview.partial.html',
                    controller: 'OverviewController',
                    controllerAs: '$ctrl'
                })
                .state('app.daily-outcome', {
                    url: '/daily-outcome',
                    templateUrl: 'createOutcome/createOutcome.partial.html',
                    controller: 'CreateOutcomeController',
                    controllerAs: '$ctrl',
                    resolve: {
                        outcomeType: function () {
                            return CoreTypes.dailyOutcome;
                        }
                    }
                })
                .state('app.monday-vision', {
                    url: '/monday-vision',
                    templateUrl: 'createOutcome/createOutcome.partial.html',
                    controller: 'CreateOutcomeController',
                    controllerAs: '$ctrl',
                    resolve: {
                        outcomeType: function () {
                            return CoreTypes.mondayVision;
                        }
                    }
                })
                .state('app.weekly-reflection', {
                    url: '/weekly-reflection',
                    templateUrl: 'createReflection/createReflection.partial.html',
                    controller: 'CreateReflectionController',
                    controllerAs: '$ctrl',
                    resolve: {
                        reflectionType: function () {
                            return CoreTypes.weeklyReflection;
                        }
                    }
                })
                .state('app.hot-spots', {
                    url: '/hot-spots',
                    templateUrl: 'hotSpots/hotSpots.partial.html',
                    controller: 'HotSpotsController',
                    controllerAs: '$ctrl'
                })
                .state('app.settings', {
                    url: '/settings',
                    templateUrl: 'settings/settings.partial.html'
                });
        }]);
})();