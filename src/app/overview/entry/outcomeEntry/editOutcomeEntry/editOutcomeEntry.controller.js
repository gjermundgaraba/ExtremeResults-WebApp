(function () {
    'use strict';

    angular
        .module('xr.overview')
        .controller('EditOutcomeEntryController', OutcomeEntryController);

    OutcomeEntryController.$inject = ['$mdDialog', 'XrUtils', 'ParseService', 'AuthService'];

    function OutcomeEntryController($mdDialog, XrUtils, ParseService, AuthService) {
        var vm = this;

        vm.saving = false;
        vm.header = XrUtils.getEntryHeader(vm.outcome) + ' for ' + XrUtils.getFormattedEntryDate(vm.outcome);

        vm.save = function () {
            if (!vm.saving) {
                vm.saving = true;
                var updateObject = {
                    firstStory: vm.outcome.firstStory,
                    secondStory: vm.outcome.secondStory,
                    thirdStory: vm.outcome.thirdStory
                };
                ParseService.updateObject(vm.outcome.className, vm.outcome.objectId,
                        updateObject, AuthService.getUserToken())
                    .then(function () {
                        $mdDialog.hide(vm.outcome);
                    })
                    .finally(function () {
                        vm.saving = false;
                    });
            }


        };
    }
})();