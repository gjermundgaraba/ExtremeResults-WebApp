(function () {
    'use strict';

    angular.module('xr.dailyOutcomes')
        .directive('dailyOutcomes', dailyOutcomesDirective);

    function dailyOutcomesDirective() {
        return {
            restrict: 'E',
            templateUrl: 'dailyOutcomes/dailyOutcomes.partial.html',
            controller: 'DailyOutcomesController'
        };
    }
})();