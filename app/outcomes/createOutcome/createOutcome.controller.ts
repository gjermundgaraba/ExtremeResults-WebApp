CreateOutcomeController.$inject = ['CreateOutcomeService', '$location', 'XrUtils'];

function CreateOutcomeController(CreateOutcomeService, $location, XrUtils) {
    var $ctrl = this;
    $ctrl.save = save;
    $ctrl.generateHeader = generateHeader;
    $ctrl.relatedEntries = [];

    $ctrl.getRelatedEntriesPromise = CreateOutcomeService.getRelatedEntriesForOutcome($ctrl.type.typeName)
        .then(function (data) {
            $ctrl.relatedEntries = data;
        });

    function save() {
        if ($ctrl.createOutcomeForm.$valid) {
            var outcome = {
                firstStory: $ctrl.outcome1,
                secondStory: $ctrl.outcome2,
                thirdStory: $ctrl.outcome3,
                typeName: $ctrl.type.typeName,
                effectiveDate: new Date()
            };

            CreateOutcomeService.createOutcome(outcome)
                .then(function () {
                    $location.path('overview');
                });
        }
    }

    function generateHeader() {
        return XrUtils.getEntryHeader($ctrl.type) + ' for ' +
            XrUtils.getFormattedEntryDate($ctrl.type, new Date());
    }
}

export {CreateOutcomeController};