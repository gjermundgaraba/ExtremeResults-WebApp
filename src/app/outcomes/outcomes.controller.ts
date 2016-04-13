namespace xrApp {

    angular
        .module('xr.outcomes')
        .controller('OutcomesController', OutcomesController);

    OutcomesController.$inject = [];

    function OutcomesController() {
        var $ctrl = this;
        $ctrl.showCreateOutcome = false;
        $ctrl.outcomeType = {
            className: 'Outcome',
            typeName: 'Daily'
        };

        $ctrl.createOutcome = function(typeName) {
            $ctrl.showCreateOutcome = true;
            $ctrl.outcomeType.typeName = typeName;
        }
    }
}