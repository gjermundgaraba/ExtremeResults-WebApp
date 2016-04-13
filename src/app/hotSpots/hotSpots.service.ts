namespace xrApp {

    angular
        .module('xr.hotSpots')
        .factory('HotSpotsService', HotSpotsServiceFactory);

    HotSpotsServiceFactory.$inject = ['Urls', '$http'];

    function HotSpotsServiceFactory(Urls, $http) {
        var service = {
            getHotSpotBuckets: getHotSpotBuckets,
            createHotSpotBucket: createHotSpotBucket,
            editHotSpotBucket: editHotSpotBucket,
            deleteHotSpotBucket: deleteHotSpotBucket
        };

        return service;

        function getHotSpotBuckets() {
            return $http.get(Urls.baseApi + 'hotSpotBuckets')
                .then(function (httpObj) {
                    return httpObj.data;
                });
        }

        function createHotSpotBucket(hotSpotBucket) {
            return $http.post(Urls.baseApi + 'hotSpotBuckets', hotSpotBucket);
        }

        function editHotSpotBucket(objectId, hotSpotBucket) {
            return $http.put(Urls.baseApi + 'hotSpotBuckets/' + objectId, hotSpotBucket);
        }

        function deleteHotSpotBucket(objectId) {
            return $http.delete(Urls.baseApi + 'hotSpotBuckets/' + objectId);
        }
    }
}