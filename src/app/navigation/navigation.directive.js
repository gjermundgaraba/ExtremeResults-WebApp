(function () {
    'use strict';

    angular
        .module('xr.navigation')
        .directive('xrNavigation', xrNavigationDirective);

    xrNavigationDirective.$inject = [];

    function xrNavigationDirective() {
        return {
            restrict: 'AE',
            scope: {},
            templateUrl: 'navigation/navigation.partial.html',
            controller: 'NavigationController',
            controllerAs: 'vm'
        };
    }


})();