CreateReflectionController.$inject = ['$scope', 'CreateReflectionService', '$location', 'XrUtils'];

function CreateReflectionController($scope, CreateReflectionService, $location, XrUtils) {
    var $ctrl = this;
    $ctrl.save = save;
    $ctrl.effectiveDate = new Date();
    $ctrl.generateHeader = generateHeader;
    $ctrl.relatedEntries = [];

    updateRelatedEntriesForReflection();

    $scope.$watch('$ctrl.effectiveDate', function (newValue, oldValue) {
        if (newValue !== oldValue) {
            updateRelatedEntriesForReflection();
        }

    });

    function save() {
        if ($ctrl.weeklyReflectionForm.$valid) {
            var weeklyReflection = {
                firstThingThatWentWell: $ctrl.firstThingThatWentWell,
                secondThingThatWentWell: $ctrl.secondThingThatWentWell,
                thirdThingThatWentWell: $ctrl.thirdThingThatWentWell,
                firstThingToImprove: $ctrl.firstThingToImprove,
                secondThingToImprove: $ctrl.secondThingToImprove,
                thirdThingToImprove: $ctrl.thirdThingToImprove,
                effectiveDate: $ctrl.effectiveDate.toISOString(),
                typeName: $ctrl.type.typeName
            };

            CreateReflectionService.createReflection(weeklyReflection)
                .then(function () {
                    $location.path('overview');
                });
        }
    }

    function generateHeader() {
        return XrUtils.getEntryHeader($ctrl.type) + ' for ' +
            XrUtils.getFormattedEntryDate($ctrl.type, $ctrl.effectiveDate);
    }

    function updateRelatedEntriesForReflection() {
        $ctrl.getRelatedEntriesPromise = CreateReflectionService.getRelatedEntriesForReflection($ctrl.type.typeName, $ctrl.effectiveDate)
            .then(function (data) {
                $ctrl.relatedEntries = data;
            });
    }

}

export {CreateReflectionController};