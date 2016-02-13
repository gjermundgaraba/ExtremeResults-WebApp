(function () {
    'use strict';

    angular
        .module('xr.overview')
        .controller('ReflectionEntryController', ReflectionEntryController);

    ReflectionEntryController.$inject = ['XrUtils'];

    function ReflectionEntryController(XrUtils) {
        var $ctrl = this;

        $ctrl.header = XrUtils.getEntryHeader($ctrl.reflectionObj);
        $ctrl.reflectionTime = XrUtils.getFormattedEntryDate($ctrl.reflectionObj);
    }
})();