namespace xrApp {

    angular
        .module('xr.overview')
        .controller('OutcomeEntryController', OutcomeEntryController);

    OutcomeEntryController.$inject = ['XrUtils', '$mdDialog'];

    function OutcomeEntryController(XrUtils, $mdDialog) {
        var $ctrl = this;
        $ctrl.editOutcome = editOutcome;

        $ctrl.header = XrUtils.getEntryHeader($ctrl.outcomeObj);
        $ctrl.outcomeTime = XrUtils.getFormattedEntryDate($ctrl.outcomeObj);

        function editOutcome() {
            var outcomeCopy = {};
            angular.copy($ctrl.outcomeObj, outcomeCopy);
            $mdDialog.show({
                controller: 'EditOutcomeEntryController',
                controllerAs: '$ctrl',
                bindToController: true,
                templateUrl: 'overview/entry/outcomeEntry/editOutcomeEntry/editOutcomeEntry.partial.html',
                parent: angular.element(document.body),
                locals: {
                    outcome: outcomeCopy
                },
                clickOutsideToClose: true
            }).then(function (updatedOutcome) {
                $ctrl.outcomeObj = updatedOutcome;
            });
        }
    }
}