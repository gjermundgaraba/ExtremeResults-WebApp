OutcomesController.$inject = [];

function OutcomesController() {
    var $ctrl = this;
    $ctrl.showCreateOutcome = false;
    $ctrl.outcomeType = {
        className: 'Outcome',
        typeName: 'Daily'
    };

    $ctrl.createOutcome = function (typeName) {
        $ctrl.showCreateOutcome = true;
        $ctrl.outcomeType.typeName = typeName;
    }
}

export {OutcomesController};