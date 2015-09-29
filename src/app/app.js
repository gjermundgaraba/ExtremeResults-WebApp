(function () {
    'use strict';

    angular
        .module('xr',
        [
            'ui.router',
            'ngMaterial',
            'ngCookies',
            'ngAnimate',
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
        .config(['$stateProvider',
                '$urlRouterProvider',
                'CoreTypes', function($stateProvider, $urlRouterProvider, CoreTypes) {
                $urlRouterProvider.otherwise( function($injector) {
                    var $state = $injector.get('$state');
                    $state.go('app.overview');
                });
            $stateProvider
                .state('login', {
                    url: '/login',
                    templateUrl: 'login/login.partial.html'
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
                });
        }])
        .run(['AuthService', '$rootScope', '$mdDialog', '$state', function run(AuthService, $rootScope, $mdDialog, $state) {
            $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
                if (!AuthService.anyOneLoggedIn()) {
                    event.preventDefault();
                    $state.go('login');
                } else {
                    AuthService.updateCurrentUser()
                        .catch(function () {
                            $state.go('login');
                        });
                }
            });
        }])
        .controller('AppCtrl', ['$scope', '$mdSidenav', 'AuthService', '$rootScope', function($scope, $mdSidenav, AuthService, $rootScope){
            $scope.toggleSidenav = function(menuId) {
                $mdSidenav(menuId).toggle();
            };

            $scope.logout = function () {
                AuthService.logout();

                $rootScope.$broadcast('$stateChangeStart', 'overview');
            }

        }]);



})();