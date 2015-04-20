'use strict';

angular.module('app', ['ngMaterial', 'ngRoute', 'app.start'])
    .controller('AppController', AppController)
    .config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.
                when('/', {
                    templateUrl: 'components/start/start.html',
                    controller: 'StartController',
                    controllerAs: 'start'
                }).
                otherwise({
                    redirectTo: '/'
                });
        }]);

AppController.$inject = ['$mdSidenav'];

function AppController ($mdSidenav) {
    var vm = this;

    vm.toggleSideNav = function () {
        $mdSidenav('mainSideNav').toggle();
    }
}
