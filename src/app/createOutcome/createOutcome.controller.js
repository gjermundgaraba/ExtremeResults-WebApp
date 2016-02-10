(function () {
    'use strict';

    angular
        .module('xr.createOutcome')
        .controller('CreateOutcomeController', CreateOutcomeController);

    CreateOutcomeController.$inject = ['ParseService', '$location', 'outcomeType', 'XrUtils', 'AuthService'];

    function CreateOutcomeController(ParseService, $location, outcomeType, XrUtils, AuthService) {
        var $ctrl = this;
        $ctrl.save = save;
        $ctrl.header = generateHeader();
        $ctrl.relatedEntries = [];

        $ctrl.getRelatedEntriesPromise = ParseService.callFunction('getRelatedEntriesForOutcome',
                {typeName: outcomeType.typeName},
                AuthService.getUserToken())
            .then(function (data) {
                $ctrl.relatedEntries = data;
            });

        function save() {
            if ($ctrl.createOutcomeForm.$valid) {
                var outcome = {
                    firstStory: $ctrl.outcome1,
                    secondStory: $ctrl.outcome2,
                    thirdStory: $ctrl.outcome3,
                    effectiveDate: {
                        '__type': 'Date',
                        'iso': new Date().toISOString()
                    },
                    typeName: outcomeType.typeName,
                    ACL: {
                        '*': { }
                    }
                };

                outcome.ACL[AuthService.getCurrentUser().objectId] = {
                    read: true,
                    write: true
                };

                ParseService.postObject(outcomeType.className, outcome, AuthService.getUserToken)
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