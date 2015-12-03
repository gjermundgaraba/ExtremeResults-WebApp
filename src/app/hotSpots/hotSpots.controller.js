(function () {
    'use strict';

    angular
        .module('xr.hotSpots')
        .controller('HotSpotsController', HotSpotsController);

    HotSpotsController.$inject = ['ParseService', 'AuthService'];

    function HotSpotsController(ParseService, AuthService) {
        var vm = this;
        vm.hotSpotBuckets = [];
        vm.handleHotSpotAdd = handleHotSpotChange;
        vm.handleHotSpotDelete = handleHotSpotChange;
        vm.saveHotSpotBucket = saveHotSpotBucket;

        getAllHotSpotBuckets();

        function getAllHotSpotBuckets() {
            ParseService.getAllObjects('HotSpotBucket', AuthService.getUserToken())
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
                        getAllHotSpotBuckets();
                    });
            }
        }
    }

})();