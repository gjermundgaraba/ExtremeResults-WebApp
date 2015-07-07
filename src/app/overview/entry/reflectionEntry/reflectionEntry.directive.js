(function () {
    'use strict';

    angular
        .module('xr.overview')
        .directive('reflectionEntry', reflectionEntryDirective);

    reflectionEntryDirective.$inject = [];

    function reflectionEntryDirective() {
        return {
            restrict: 'AE',
            scope: {
                reflectionObj: '='
            },
            controller: 'ReflectionEntryController',
            controllerAs: 'vm',
            templateUrl: 'overview/entry/reflectionEntry/reflectionEntry.partial.html'
        };
    }

})();