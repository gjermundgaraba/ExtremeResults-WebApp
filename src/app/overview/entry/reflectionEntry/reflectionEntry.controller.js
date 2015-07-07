(function () {
    'use strict';

    angular
        .module('xr.overview')
        .controller('ReflectionEntryController', ReflectionEntryController);

    ReflectionEntryController.$inject = ['$scope', '$filter'];

    function ReflectionEntryController($scope, $filter) {
        var vm = this;
        vm.header = generateHeader();
        vm.reflectionTime = generateOutcomeTime();

        function generateHeader() {
            // For now, this works because all types are just camel cased names
            return $scope.reflectionObj.className.replace(/([a-z])([A-Z])/g, '$1 $2');
        }

        function generateOutcomeTime() {
            return 'Week ' + $filter('date')($scope.reflectionObj.createdAt, 'w');
        }
    }
})();