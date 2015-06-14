(function () {
    'use strict';

    angular
        .module('xr.overview')
        .directive('dailyOutcomeEntry', dailyOutcomeEntryDirective);

    dailyOutcomeEntryDirective.$inject = [];

    function dailyOutcomeEntryDirective() {
        return {
            restrict: 'AE',
            scope: {
                dailyOutcome: '='
            },
            templateUrl: 'overview/entry/dailyOutcomeEntry/dailyOutcomeEntry.partial.html'
        };
    }

})();