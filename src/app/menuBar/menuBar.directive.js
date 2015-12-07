(function () {
    'use strict';

    angular
        .module('xr.menuBar')
        .directive('xrMenuBar', xrMenuBarDirective);

    xrMenuBarDirective.$inject = [];

    function xrMenuBarDirective() {
        return {
            restrict: 'AE',
            scope: {

            },
            templateUrl: 'menuBar/menuBar.partial.html',
            controller: 'MenuBarController',
            controllerAs: 'vm'
        };
    }


})();