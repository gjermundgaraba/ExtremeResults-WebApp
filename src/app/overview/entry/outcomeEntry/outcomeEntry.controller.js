(function () {
    'use strict';

    angular
        .module('xr.overview')
        .controller('OutcomeEntryController', OutcomeEntryController);

    OutcomeEntryController.$inject = ['$scope', '$filter', 'XrUtils'];

    function OutcomeEntryController($scope, $filter, XrUtils) {
        var vm = this;
        vm.header = generateHeader();
        vm.outcomeTime = generateOutcomeTime();

        function generateHeader() {
            return XrUtils.getEntryHeader($scope.outcomeObj);
        }

        function generateOutcomeTime() {
            return XrUtils.getFormattedEntryDate($scope.outcomeObj);
        }
    }
})();