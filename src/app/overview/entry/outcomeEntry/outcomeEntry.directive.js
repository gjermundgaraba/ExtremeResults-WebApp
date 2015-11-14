(function () {
    'use strict';

    angular
        .module('xr.overview')
        .directive('outcomeEntry', outcomeEntryDirective);

    outcomeEntryDirective.$inject = [];

    function outcomeEntryDirective() {
        return {
            restrict: 'AE',
            scope: {
                outcomeObj: '='
            },
            bindToController: true,
            controller: 'OutcomeEntryController',
            controllerAs: 'vm',
            templateUrl: 'overview/entry/outcomeEntry/outcomeEntry.partial.html'
        };
    }

})();