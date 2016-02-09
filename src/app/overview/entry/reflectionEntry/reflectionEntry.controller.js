(function () {
    'use strict';

    angular
        .module('xr.overview')
        .controller('ReflectionEntryController', ReflectionEntryController);

    ReflectionEntryController.$inject = ['XrUtils'];

    function ReflectionEntryController(XrUtils) {
        var vm = this;

        vm.header = XrUtils.getEntryHeader(vm.reflectionObj);
        vm.reflectionTime = XrUtils.getFormattedEntryDate(vm.reflectionObj);
    }
})();