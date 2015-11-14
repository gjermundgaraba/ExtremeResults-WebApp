(function () {
    'use strict';

    angular
        .module('xr.overview')
        .controller('OutcomeEntryController', OutcomeEntryController);

    OutcomeEntryController.$inject = ['XrUtils', '$mdDialog'];

    function OutcomeEntryController(XrUtils, $mdDialog) {
        var vm = this;
        vm.editOutcome = editOutcome;

        vm.header = XrUtils.getEntryHeader(vm.outcomeObj);
        vm.outcomeTime = XrUtils.getFormattedEntryDate(vm.outcomeObj);

        function editOutcome() {
            var outcomeCopy = {};
            angular.copy(vm.outcomeObj, outcomeCopy);
            $mdDialog.show({
                controller: 'EditOutcomeEntryController',
                controllerAs: 'vm',
                bindToController: true,
                templateUrl: 'overview/entry/outcomeEntry/editOutcomeEntry/editOutcomeEntry.partial.html',
                parent: angular.element(document.body),
                locals: {
                    outcome: outcomeCopy
                },
                clickOutsideToClose: true
            }).then(function (updatedOutcome) {
                vm.outcomeObj = updatedOutcome;
            });
        }
    }
})();