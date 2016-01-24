(function () {
    'use strict';

    angular
        .module('xr.hotSpots')
        .controller('HotSpotsController', HotSpotsController);

    HotSpotsController.$inject = ['ParseService', 'AuthService', '$mdDialog'];

    function HotSpotsController(ParseService, AuthService, $mdDialog) {
        var vm = this;
        vm.hotSpotBuckets = [];
        vm.handleHotSpotAdd = handleHotSpotChange;
        vm.handleHotSpotDelete = handleHotSpotChange;
        vm.saveHotSpotBucket = saveHotSpotBucket;
        vm.editHotSpotBucket = editHotSpotBucket;

        getAllHotSpotBuckets();

        function getAllHotSpotBuckets() {
            vm.getHotSpotsPromise = ParseService.getAllObjects('HotSpotBucket', AuthService.getUserToken())
                .then(function (hotSpotBuckets) {
                    vm.hotSpotBuckets = hotSpotBuckets;
                });
        }

        function handleHotSpotChange(hotSpotBucket) {
            var updateObj = {
                hotSpots: hotSpotBucket.hotSpots
            };

            ParseService.updateObject('HotSpotBucket', hotSpotBucket.objectId, updateObj, AuthService.getUserToken());
        }

        function saveHotSpotBucket() {
            if (vm.hotSpotBucketForm.$valid) {
                var hotSpotBucket = {
                    name: vm.hotSpotBucketName,
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
                        vm.hotSpotBucketName = ''; // Reset field
                        vm.hotSpotBucketForm.$setPristine();
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