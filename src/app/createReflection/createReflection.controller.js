(function () {
    'use strict';

    angular
        .module('xr.createReflection')
        .controller('CreateReflectionController', CreateReflectionController);

    CreateReflectionController.$inject = ['$scope', 'ParseService', '$location', 'reflectionType', 'XrUtils', 'AuthService'];

    function CreateReflectionController($scope, ParseService, $location, reflectionType, XrUtils, AuthService) {
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
                    effectiveDate: {
                        '__type': 'Date',
                        'iso': $ctrl.effectiveDate.toISOString()
                    },
                    typeName: reflectionType.typeName,
                    ACL: {
                        '*': { }
                    }
                };

                weeklyReflection.ACL[AuthService.getCurrentUser().objectId] = {
                    read: true,
                    write: true
                };

                ParseService.postObject(reflectionType.className, weeklyReflection)
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
            $ctrl.getRelatedEntriesPromise = ParseService.callFunction('getRelatedEntriesForReflection',
                    {typeName: reflectionType.typeName, outcomeDate: $ctrl.effectiveDate},
                    AuthService.getUserToken())
                .then(function (data) {
                    $ctrl.relatedEntries = data;
                });
        }

    }

})();