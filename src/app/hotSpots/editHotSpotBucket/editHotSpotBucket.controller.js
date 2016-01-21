(function () {
    'use strict';

    angular
        .module('xr.hotSpots')
        .controller('EditHotSpotBucketController', EditHotSpotBucketController);

    EditHotSpotBucketController.$inject = ['$mdDialog', 'ParseService', 'AuthService'];

    function EditHotSpotBucketController($mdDialog, ParseService, AuthService) {
        var vm = this;

        vm.saving = false;
        vm.deleteHotSpotBucket = deleteHotSpotBucket;
        vm.save = save;

        function save() {
            if (!vm.saving) {
                vm.saving = true;
                var updateObject = {
                    name: vm.hotSpotBucket.name
                };
                ParseService.updateObject('HotSpotBucket', vm.hotSpotBucket.objectId,
                        updateObject, AuthService.getUserToken())
                    .then(function () {
                        $mdDialog.hide(vm.hotSpotBucket);
                    })
                    .finally(function () {
                        vm.saving = false;
                    });
            }
        }

        function deleteHotSpotBucket() {
            if (!vm.saving) {
                vm.saving = true;

                ParseService.deleteObject('HotSpotBucket', vm.hotSpotBucket.objectId, AuthService.getUserToken())
                    .then(function () {
                        $mdDialog.hide();
                    })
                    .finally(function () {
                        vm.saving = false;
                    });
            }
        }
    }
})();