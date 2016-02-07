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
                    controllerAs: 'vm'
                })
                .state('register', {
                    url: '/register',
                    templateUrl: 'register/register.partial.html',
                    controller: 'RegisterController',
                    controllerAs: 'vm'
                })
                .state('app', {
                    url: '',
                    templateUrl: 'app.html'
                })
                .state('app.overview', {
                    url: '/overview',
                    templateUrl: 'overview/overview.partial.html',
                    controller: 'OverviewController',
                    controllerAs: 'vm'
                })
                .state('app.daily-outcome', {
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
                .state('app.monday-vision', {
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
                .state('app.weekly-reflection', {
                    url: '/weekly-reflection',
                    templateUrl: 'createReflection/createReflection.partial.html',
                    controller: 'CreateReflectionController',
                    controllerAs: 'vm',
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
                    controllerAs: 'vm'
                })
                .state('app.settings', {
                    url: '/settings',
                    templateUrl: 'settings/settings.partial.html'
                });
        }]);
})();