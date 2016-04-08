(function () {
    'use strict';

    angular
        .module('xr.hotSpots')
        .controller('EditHotSpotBucketController', EditHotSpotBucketController);

    EditHotSpotBucketController.$inject = ['$mdDialog', 'HotSpotsService'];

    function EditHotSpotBucketController($mdDialog, HotSpotsService) {
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
                HotSpotsService.editHotSpotBucket($ctrl.hotSpotBucket.objectId, updateObject)
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

                        HotSpotsService.deleteHotSpotBucket($ctrl.hotSpotBucket.objectId)
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