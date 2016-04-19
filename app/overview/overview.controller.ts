OverviewController.$inject = ['OverviewService'];

function OverviewController(OverviewService) {
    var $ctrl = this;

    $ctrl.overviewEntries = [];
    $ctrl.activeEntries = [];
    $ctrl.allEntriesLoaded = false;

    $ctrl.getActiveEntriesPromise = OverviewService.getActiveEntries()
        .then(function (data) {
            $ctrl.activeEntries = data;
        });
}

export {OverviewController};