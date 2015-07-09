(function () {
    'use strict';

    angular
        .module('xr.overview')
        .controller('EntryController', EntryController);

    EntryController.$inject = ['$mdDialog'];

    function EntryController($mdDialog) {
        var vm = this;

        vm.showEntry = showEntry;

        function showEntry(entryObj) {
            $mdDialog.show({
                controller: 'ShowEntryController',
                controllerAs: 'vm',
                templateUrl: 'overview/showEntries/showEntry/showEntry.partial.html',
                locals: {
                    entryObj: entryObj
                }
            });
        }
    }

})();