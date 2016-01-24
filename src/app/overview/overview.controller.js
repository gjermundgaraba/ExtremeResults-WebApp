(function () {
    'use strict';

    angular
        .module('xr.overview')
        .controller('OverviewController', OverviewController);

    OverviewController.$inject = ['ParseService', 'AuthService'];

    function OverviewController(ParseService, AuthService) {
        var vm = this;

        vm.overviewEntries = [];
        vm.activeEntries = [];
        vm.allEntriesLoaded = false;
        vm.getAllEntries = getAllEntries;

        var token = AuthService.getUserToken();

        vm.getActiveEntriesPromise = ParseService.callFunction('getActiveEntries', null, token)
            .then(function(data) {
                vm.activeEntries = data;
            });

        function getAllEntries() {
            vm.getAllEntriesPromise = ParseService.callFunction('getEntries', null, token)
                .then(function(data) {
                    vm.allEntriesLoaded = true;
                    vm.overviewEntries = data;
                });
        }
    }

})();