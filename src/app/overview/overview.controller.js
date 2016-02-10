(function () {
    'use strict';

    angular
        .module('xr.overview')
        .controller('OverviewController', OverviewController);

    OverviewController.$inject = ['ParseService', 'AuthService'];

    function OverviewController(ParseService, AuthService) {
        var $ctrl = this;

        $ctrl.overviewEntries = [];
        $ctrl.activeEntries = [];
        $ctrl.allEntriesLoaded = false;
        $ctrl.getAllEntries = getAllEntries;

        var token = AuthService.getUserToken();

        $ctrl.getActiveEntriesPromise = ParseService.callFunction('getActiveEntries', null, token)
            .then(function(data) {
                $ctrl.activeEntries = data;
            });

        function getAllEntries() {
            $ctrl.getAllEntriesPromise = ParseService.callFunction('getEntries', null, token)
                .then(function(data) {
                    $ctrl.allEntriesLoaded = true;
                    $ctrl.overviewEntries = data;
                });
        }
    }

})();