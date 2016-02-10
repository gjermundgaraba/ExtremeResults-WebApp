(function () {
    'use strict';

    angular
        .module('xr.hotSpots')
        .controller('HotSpotsController', HotSpotsController);

    HotSpotsController.$inject = ['ParseService', 'AuthService', '$mdDialog'];

    function HotSpotsController(ParseService, AuthService, $mdDialog) {
        var $ctrl = this;
        $ctrl.hotSpotBuckets = [];
        $ctrl.handleHotSpotAdd = handleHotSpotChange;
        $ctrl.handleHotSpotDelete = handleHotSpotChange;
        $ctrl.saveHotSpotBucket = saveHotSpotBucket;
        $ctrl.editHotSpotBucket = editHotSpotBucket;

        getAllHotSpotBuckets();

        function getAllHotSpotBuckets() {
            $ctrl.getHotSpotsPromise = ParseService.getAllObjects('HotSpotBucket', AuthService.getUserToken())
                .then(function (hotSpotBuckets) {
                    $ctrl.hotSpotBuckets = hotSpotBuckets;
                });
        }

        function handleHotSpotChange(hotSpotBucket) {
            var updateObj = {
                hotSpots: hotSpotBucket.hotSpots
            };

            ParseService.updateObject('HotSpotBucket', hotSpotBucket.objectId, updateObj, AuthService.getUserToken());
        }

        function saveHotSpotBucket() {
            if ($ctrl.hotSpotBucketForm.$valid) {
                var hotSpotBucket = {
                    name: $ctrl.hotSpotBucketName,
                    hotSpots: [],
                    ACL: {
                        '*': { }
                    }
                };

                hotSpotBucket.ACL[AuthService.getCurrentUser().objectId] = {
                    read: true,
                    write: true
                };

                ParseService.postObject('HotSpotBucket', hotSpotBucket)
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
                controllerAs: 'vm',
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