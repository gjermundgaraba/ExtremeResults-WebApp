(function () {
    'use strict';

    angular
        .module('xr.hotSpots')
        .controller('EditHotSpotBucketController', EditHotSpotBucketController);

    EditHotSpotBucketController.$inject = ['$mdDialog', 'ParseService', 'AuthService'];

    function EditHotSpotBucketController($mdDialog, ParseService, AuthService) {
        var $ctrl = this;

        $ctrl.saving = false;
        $ctrl.deleteHotSpotBucket = deleteHotSpotBucket;
        $ctrl.save = save;

        function save() {
            if (!$ctrl.saving) {
                $ctrl.saving = true;
                var updateObject = {
                    name: $ctrl.hotSpotBucket.name
                };
                ParseService.updateObject('HotSpotBucket', $ctrl.hotSpotBucket.objectId,
                        updateObject, AuthService.getUserToken())
                    .then(function () {
                        $ctrl.renameCallback($ctrl.hotSpotBucket);
                        $mdDialog.hide();
                    })
                    .finally(function () {
                        $ctrl.saving = false;
                    });
            }
        }

        function deleteHotSpotBucket() {
            if (!$ctrl.saving) {
                var confirm = $mdDialog.confirm()
                    .title('Are you sure you want to delete this hot spot bucket?')
                    .ok('Yes')
                    .cancel('No');

                $mdDialog.show(confirm)
                    .then(function () {
                        $ctrl.saving = true;

                        ParseService.deleteObject('HotSpotBucket', $ctrl.hotSpotBucket.objectId, AuthService.getUserToken())
                            .then(function () {
                                $ctrl.deleteCallback();
                            })
                            .finally(function () {
                                $ctrl.saving = false;
                            });
                    });


            }
        }
    }
})();