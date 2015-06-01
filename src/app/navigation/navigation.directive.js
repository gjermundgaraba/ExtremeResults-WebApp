(function () {
    'use strict';

    angular
        .module('xr.navigation')
        .directive('xrNavigation', xrNavigationDirective);

    xrNavigationDirective.$inject = [];

    function xrNavigationDirective() {
        return {
            restrict: 'AE',
            templateUrl: 'navigation/navigation.partial.html'
        }
    }


})();