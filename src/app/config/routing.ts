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
                .state('app.outcomes', {
                    url: '/outcomes',
                    templateUrl: 'outcomes/outcomes.partial.html',
                    controller: 'OutcomesController',
                    controllerAs: '$ctrl'
                })
                .state('app.reflections', {
                    url: '/reflections',
                    templateUrl: 'reflections/reflections.partial.html',
                    controller: 'ReflectionsController',
                    controllerAs: '$ctrl'
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