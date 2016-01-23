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
                        vm.renameCallback(vm.hotSpotBucket);
                        $mdDialog.hide();
                    })
                    .finally(function () {
                        vm.saving = false;
                    });
            }
        }

        function deleteHotSpotBucket() {
            if (!vm.saving) {
                var confirm = $mdDialog.confirm()
                    .title('Are you sure you want to delete this hot spot bucket?')
                    .ok('Yes')
                    .cancel('No');

                $mdDialog.show(confirm)
                    .then(function () {
                        vm.saving = true;

                        ParseService.deleteObject('HotSpotBucket', vm.hotSpotBucket.objectId, AuthService.getUserToken())
                            .then(function () {
                                vm.deleteCallback();
                            })
                            .finally(function () {
                                vm.saving = false;
                            });
                    });


            }
        }
    }
})();