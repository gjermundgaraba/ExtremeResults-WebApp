(function () {
    'use strict';

    angular
        .module('xr.overview')
        .controller('ReflectionEntryController', ReflectionEntryController);

    ReflectionEntryController.$inject = ['$scope', 'XrUtils'];

    function ReflectionEntryController($scope, XrUtils) {
        var vm = this;

        vm.header = XrUtils.getEntryHeader($scope.reflectionObj);
        vm.reflectionTime = XrUtils.getFormattedEntryDate($scope.reflectionObj);
    }
})();