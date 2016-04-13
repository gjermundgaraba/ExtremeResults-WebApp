namespace xrApp {

    angular
        .module('xr.overview')
        .controller('EditOutcomeEntryController', OutcomeEntryController);

    OutcomeEntryController.$inject = ['$mdDialog', 'XrUtils', 'EditOutcomeEntryService'];

    function OutcomeEntryController($mdDialog, XrUtils, EditOutcomeEntryService) {
        var $ctrl = this;

        $ctrl.saving = false;
        $ctrl.header = XrUtils.getEntryHeader($ctrl.outcome) + ' for ' + XrUtils.getFormattedEntryDate($ctrl.outcome);

        $ctrl.save = function () {
            if (!$ctrl.saving && $ctrl.editOutcomeForm.$valid) {
                $ctrl.saving = true;
                var updateObject = {
                    typeName: $ctrl.outcome.typeName,
                    firstStory: $ctrl.outcome.firstStory,
                    secondStory: $ctrl.outcome.secondStory,
                    thirdStory: $ctrl.outcome.thirdStory,
                    effectiveDate: $ctrl.outcome.effectiveDate,
                };

                EditOutcomeEntryService.editOutcome($ctrl.outcome.objectId, updateObject)
                    .then(function () {
                        $mdDialog.hide($ctrl.outcome);
                    })
                    .finally(function () {
                        $ctrl.saving = false;
                    });
            }


        };
    }
}