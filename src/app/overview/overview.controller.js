(function () {
    'use strict';

    angular
        .module('xr.overview')
        .controller('OverviewController', OverviewController);

    OverviewController.$inject = ['ParseService'];

    function OverviewController(ParseService) {
        var vm = this;

        vm.overviewEntries = [];
        vm.activeEntries = [];

        ParseService.callFunction('getEntries')
            .then(function(data) {
                vm.overviewEntries = data;
            });

        ParseService.callFunction('getActiveEntries')
            .then(function(data) {
                vm.activeEntries = data;
            });
    }

})();