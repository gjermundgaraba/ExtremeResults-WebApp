
export class HotSpotsService {

    static $inject = ['Urls', '$http'];
    
    constructor(private Urls, private $http) {}
    
    getHotSpotBuckets() {
        return this.$http.get(this.Urls.baseApi + 'hotSpotBuckets')
            .then((httpObj) => httpObj.data);
    }

    createHotSpotBucket(hotSpotBucket) {
        return this.$http.post(this.Urls.baseApi + 'hotSpotBuckets', hotSpotBucket);
    }

    editHotSpotBucket(objectId, hotSpotBucket) {
        return this.$http.put(this.Urls.baseApi + 'hotSpotBuckets/' + objectId, hotSpotBucket);
    }

    deleteHotSpotBucket(objectId) {
        return this.$http.delete(this.Urls.baseApi + 'hotSpotBuckets/' + objectId);
    }
}