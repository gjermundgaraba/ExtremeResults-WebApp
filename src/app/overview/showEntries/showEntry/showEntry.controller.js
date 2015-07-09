(function () {
    'use strict';

    angular
        .module('xr.overview')
        .controller('ShowEntryController', ShowEntryController);

    ShowEntryController.$inject = ['$mdDialog', 'entryObj', 'XrUtils'];

    function ShowEntryController($mdDialog, entryObj, XrUtils) {
        var vm = this;
        vm.entryObj = entryObj;
        vm.header = generateHeader();

        vm.hide = function() {
            $mdDialog.hide();
        };

        function generateHeader() {
            return XrUtils.getEntryHeader(entryObj) + ' for ' + XrUtils.getFormattedEntryDate(entryObj);
        }
    }
})();