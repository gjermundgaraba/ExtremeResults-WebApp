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

        var token = AuthService.getUserToken();

        ParseService.callFunction('getEntries', null, token)
            .then(function(data) {
                vm.overviewEntries = data;
            });

        ParseService.callFunction('getActiveEntries', null, token)
            .then(function(data) {
                vm.activeEntries = data;
            });
    }

})();