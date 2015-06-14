(function () {
    'use strict';

    angular
        .module('xr.overview')
        .directive('mondayVisionEntry', mondayVisionEntryDirective);

    mondayVisionEntryDirective.$inject = [];

    function mondayVisionEntryDirective() {
        return {
            restrict: 'AE',
            scope: {
                mondayVision: '='
            },
            templateUrl: 'overview/entry/mondayVisionEntry/mondayVisionEntry.partial.html'
        };
    }

})();