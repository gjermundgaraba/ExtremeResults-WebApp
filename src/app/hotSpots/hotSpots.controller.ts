(function () {
    'use strict';

    angular
        .module('xr.hotSpots')
        .controller('HotSpotsController', HotSpotsController);

    HotSpotsController.$inject = ['HotSpotsService', '$mdDialog'];

    function HotSpotsController(HotSpotsService, $mdDialog) {
        var $ctrl = this;
        $ctrl.hotSpotBuckets = [];
        $ctrl.handleHotSpotAdd = handleHotSpotChange;
        $ctrl.handleHotSpotDelete = handleHotSpotChange;
        $ctrl.saveHotSpotBucket = saveHotSpotBucket;
        $ctrl.editHotSpotBucket = editHotSpotBucket;

        getAllHotSpotBuckets();

        function getAllHotSpotBuckets() {
            $ctrl.getHotSpotsPromise = HotSpotsService.getHotSpotBuckets()
                .then(function (hotSpotBuckets) {
                    $ctrl.hotSpotBuckets = hotSpotBuckets;
                });
        }

        function handleHotSpotChange(hotSpotBucket) {
            var updateObj = {
                name: hotSpotBucket.name,
                hotSpots: hotSpotBucket.hotSpots
            };

            HotSpotsService.editHotSpotBucket(hotSpotBucket.objectId, updateObj);
        }

        function saveHotSpotBucket() {
            if ($ctrl.hotSpotBucketForm.$valid) {
                var hotSpotBucket = {
                    name: $ctrl.hotSpotBucketName,
                    hotSpots: []
                };

                HotSpotsService.createHotSpotBucket(hotSpotBucket)
                    .then(function () {
                        $ctrl.hotSpotBucketName = ''; // Reset field
                        $ctrl.hotSpotBucketForm.$setPristine();
                        getAllHotSpotBuckets();
                    });
            }
        }

        function editHotSpotBucket(hotSpotBucket) {
            var hotSpotBucketCopy = {};
            angular.copy(hotSpotBucket, hotSpotBucketCopy);
            $mdDialog.show({
                controller: 'EditHotSpotBucketController',
                controllerAs: '$ctrl',
                bindToController: true,
                templateUrl: 'hotSpots/editHotSpotBucket/editHotSpotBucket.partial.html',
                parent: angular.element(document.body),
                locals: {
                    hotSpotBucket: hotSpotBucketCopy,
                    deleteCallback: function () {
                        getAllHotSpotBuckets();
                    },
                    renameCallback: function (updatedHotSpotBucket) {
                        hotSpotBucket.name = updatedHotSpotBucket.name;
                    }
                },
                clickOutsideToClose: true
            });
        }
    }

})();