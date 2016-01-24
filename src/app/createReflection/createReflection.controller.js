(function () {
    'use strict';

    angular
        .module('xr.createReflection')
        .controller('CreateReflectionController', CreateReflectionController);

    CreateReflectionController.$inject = ['$scope', 'ParseService', '$location', 'reflectionType', 'XrUtils', 'AuthService'];

    function CreateReflectionController($scope, ParseService, $location, reflectionType, XrUtils, AuthService) {
        var vm = this;
        vm.save = save;
        vm.effectiveDate = new Date();
        vm.generateHeader = generateHeader;
        vm.relatedEntries = [];

        updateRelatedEntriesForReflection();

        $scope.$watch('vm.effectiveDate', function (newValue, oldValue) {
            if (newValue !== oldValue) {
                updateRelatedEntriesForReflection();
            }

        });

        function save() {
            if (vm.weeklyReflectionForm.$valid) {
                var weeklyReflection = {
                    firstThingThatWentWell: vm.firstThingThatWentWell,
                    secondThingThatWentWell: vm.secondThingThatWentWell,
                    thirdThingThatWentWell: vm.thirdThingThatWentWell,
                    firstThingToImprove: vm.firstThingToImprove,
                    secondThingToImprove: vm.secondThingToImprove,
                    thirdThingToImprove: vm.thirdThingToImprove,
                    effectiveDate: {
                        '__type': 'Date',
                        'iso': vm.effectiveDate.toISOString()
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
                XrUtils.getFormattedEntryDate(reflectionType, vm.effectiveDate);
        }

        function updateRelatedEntriesForReflection() {
            vm.getRelatedEntriesPromise = ParseService.callFunction('getRelatedEntriesForReflection',
                    {typeName: reflectionType.typeName, outcomeDate: vm.effectiveDate},
                    AuthService.getUserToken())
                .then(function (data) {
                    vm.relatedEntries = data;
                });
        }

    }

})();