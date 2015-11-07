(function () {
    'use strict';

    angular
        .module('xr.overview')
        .controller('OutcomeEntryController', OutcomeEntryController);

    OutcomeEntryController.$inject = ['$scope', 'XrUtils'];

    function OutcomeEntryController($scope, XrUtils) {
        var vm = this;

        vm.header = XrUtils.getEntryHeader($scope.outcomeObj);
        vm.outcomeTime = XrUtils.getFormattedEntryDate($scope.outcomeObj);
    }
})();