(function () {
    'use strict';

    angular
        .module('xr.createOutcome')
        .controller('CreateOutcomeController', CreateOutcomeController);

    CreateOutcomeController.$inject = ['ParseService', '$location', 'outcomeType', 'XrUtils', 'AuthService'];

    function CreateOutcomeController(ParseService, $location, outcomeType, XrUtils, AuthService) {
        var vm = this;
        vm.save = save;
        vm.header = generateHeader();
        vm.relatedEntries = [];

        function save() {
            var outcome = {
                firstStory: vm.outcome1,
                secondStory: vm.outcome2,
                thirdStory: vm.outcome3,
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

            ParseService.postObject(outcomeType.className, outcome)
                .then(function () {
                    $location.path('overview');
                });
        }

        function generateHeader() {
            return XrUtils.getEntryHeader(outcomeType) + ' for ' +
                   XrUtils.getFormattedEntryDate(outcomeType, new Date());
        }

        ParseService.callFunction('getRelatedEntriesForOutcome', {typeName: outcomeType.typeName})
            .then(function (data) {
                vm.relatedEntries = data;
            });
    }
})();