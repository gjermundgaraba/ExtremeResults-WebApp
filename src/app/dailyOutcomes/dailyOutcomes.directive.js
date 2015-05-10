(function () {
    'use strict';

    angular.module('xr.dailyOutcomes')
        .directive('dailyOutcomes', dailyOutcomesDirectory);

    function dailyOutcomesDirectory() {
        return {
            restrict: 'E',
            templateUrl: 'dailyOutcomes/dailyOutcomes.partial.html'
        }
    }
})();