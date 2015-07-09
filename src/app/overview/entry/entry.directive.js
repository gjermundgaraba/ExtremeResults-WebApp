(function () {
    'use strict';

    angular
        .module('xr.overview')
        .directive('overviewEntry', overviewEntryDirective);

    overviewEntryDirective.$inject = [];

    function overviewEntryDirective() {
        return {
            restrict: 'AE',
            replace: true,
            scope: {
                entryObj: '='
            },
            controller: 'EntryController',
            controllerAs: 'vm',
            templateUrl: 'overview/entry/entry.partial.html'
        };
    }

})();