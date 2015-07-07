(function () {
    'use strict';

    angular
        .module('xr.overview')
        .controller('OutcomeEntryController', OutcomeEntryController);

    OutcomeEntryController.$inject = ['$scope', '$filter'];

    function OutcomeEntryController($scope, $filter) {
        var vm = this;
        vm.header = generateHeader();
        vm.outcomeTime = generateOutcomeTime();

        function generateHeader() {
            // For now, this works because all types are just camel cased names
            return $scope.outcomeObj.className.replace(/([a-z])([A-Z])/g, '$1 $2');
        }

        function generateOutcomeTime() {
            switch ($scope.outcomeObj.className) {
                case 'DailyOutcome':
                    return $filter('date')($scope.outcomeObj.createdAt);
                    break;
                case 'WeeklyReflection':
                case 'MondayVision':
                    return 'Week ' + $filter('date')($scope.outcomeObj.createdAt, 'w');
                    break;
                default:
                    return '';

            }
        }
    }
})();