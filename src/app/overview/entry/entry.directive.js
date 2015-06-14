(function () {
    'use strict';

    angular
        .module('xr.overview')
        .directive('overviewEntry', overviewEntryDirective);

    overviewEntryDirective.$inject = [];

    function overviewEntryDirective() {
        return {
            restrict: 'AE',
            scope: {
                entryObj: '='
            },
            templateUrl: 'overview/entry/entry.partial.html'
        };
    }

})();