(function () {
    'use strict';

    angular
        .module('xr.createReflection')
        .controller('CreateReflectionController', CreateReflectionController);

    CreateReflectionController.$inject = ['$scope', 'CreateReflectionService', '$location', 'reflectionType', 'XrUtils'];

    function CreateReflectionController($scope, CreateReflectionService, $location, reflectionType, XrUtils, AuthService) {
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
                    typeName: reflectionType.typeName
                };

                CreateReflectionService.createReflection(weeklyReflection)
                    .then(function () {
                        $location.path('overview');
                    });
            }
        }

        function generateHeader() {
            return XrUtils.getEntryHeader(reflectionType) + ' for ' +
                XrUtils.getFormattedEntryDate(reflectionType, $ctrl.effectiveDate);
        }

        function updateRelatedEntriesForReflection() {
            $ctrl.getRelatedEntriesPromise = CreateReflectionService.getRelatedEntriesForReflection(reflectionType.typeName, $ctrl.effectiveDate)
                .then(function (data) {
                    $ctrl.relatedEntries = data;
                });
        }

    }

})();