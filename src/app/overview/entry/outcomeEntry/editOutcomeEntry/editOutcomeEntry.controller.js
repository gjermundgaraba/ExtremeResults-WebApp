(function () {
    'use strict';

    angular
        .module('xr.overview')
        .controller('EditOutcomeEntryController', OutcomeEntryController);

    OutcomeEntryController.$inject = ['$mdDialog', 'XrUtils', 'ParseService', 'AuthService'];

    function OutcomeEntryController($mdDialog, XrUtils, ParseService, AuthService) {
        var $ctrl = this;

        $ctrl.saving = false;
        $ctrl.header = XrUtils.getEntryHeader($ctrl.outcome) + ' for ' + XrUtils.getFormattedEntryDate($ctrl.outcome);

        $ctrl.save = function () {
            if (!$ctrl.saving && $ctrl.editOutcomeForm.$valid) {
                $ctrl.saving = true;
                var updateObject = {
                    firstStory: $ctrl.outcome.firstStory,
                    secondStory: $ctrl.outcome.secondStory,
                    thirdStory: $ctrl.outcome.thirdStory
                };
                ParseService.updateObject($ctrl.outcome.className, $ctrl.outcome.objectId,
                        updateObject, AuthService.getUserToken())
                    .then(function () {
                        $mdDialog.hide($ctrl.outcome);
                    })
                    .finally(function () {
                        $ctrl.saving = false;
                    });
            }


        };
    }
})();