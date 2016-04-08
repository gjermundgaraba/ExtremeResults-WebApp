(function () {
    'use strict';

    angular
        .module('xr.createOutcome')
        .controller('CreateOutcomeController', CreateOutcomeController);

    CreateOutcomeController.$inject = ['CreateOutcomeService', '$location', 'outcomeType', 'XrUtils'];

    function CreateOutcomeController(CreateOutcomeService, $location, outcomeType, XrUtils) {
        var $ctrl = this;
        $ctrl.save = save;
        $ctrl.header = generateHeader();
        $ctrl.relatedEntries = [];

        $ctrl.getRelatedEntriesPromise = CreateOutcomeService.getRelatedEntriesForOutcome(outcomeType.typeName)
            .then(function (data) {
                $ctrl.relatedEntries = data;
            });

        function save() {
            if ($ctrl.createOutcomeForm.$valid) {
                var outcome = {
                    firstStory: $ctrl.outcome1,
                    secondStory: $ctrl.outcome2,
                    thirdStory: $ctrl.outcome3,
                    typeName: outcomeType.typeName,
                    effectiveDate: new Date()
                };

                CreateOutcomeService.createOutcome(outcome)
                    .then(function () {
                        $location.path('overview');
                    });
            }
        }

        function generateHeader() {
            return XrUtils.getEntryHeader(outcomeType) + ' for ' +
                   XrUtils.getFormattedEntryDate(outcomeType, new Date());
        }
    }
})();