(function () {
    'use strict';

    angular
        .module('xr.overview')
        .directive('weeklyReflectionEntry', weeklyReflectionEntryDirective);

    weeklyReflectionEntryDirective.$inject = [];

    function weeklyReflectionEntryDirective() {
        return {
            restrict: 'AE',
            scope: {
                weeklyReflection: '='
            },
            templateUrl: 'overview/entry/weeklyReflectionEntry/weeklyReflectionEntry.partial.html'
        }
    }

})();