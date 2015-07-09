(function () {
    'use strict';

    angular
        .module('xr.overview')
        .controller('ReflectionEntryController', ReflectionEntryController);

    ReflectionEntryController.$inject = ['$scope', 'XrUtils'];

    function ReflectionEntryController($scope, XrUtils) {
        var vm = this;
        vm.header = generateHeader();
        vm.reflectionTime = generateOutcomeTime();

        function generateHeader() {
            return XrUtils.getEntryHeader($scope.reflectionObj);
        }

        function generateOutcomeTime() {
            return XrUtils.getFormattedEntryDate($scope.reflectionObj);
        }
    }
})();