
import IPromise = angular.IPromise;
import IHttpService = angular.IHttpService;
import IHttpPromise = angular.IHttpPromise;
import IHttpPromiseCallbackArg = angular.IHttpPromiseCallbackArg;

export interface IHotSpotBucket {
    objectId?: string,
    name: string,
    hotSpots: Array<string>
}

export class HotSpotsService {

    static $inject = ['Urls', '$http'];
    
    constructor(private Urls, private $http: IHttpService) {}
    
    getHotSpotBuckets(): IPromise<Array<IHotSpotBucket>> {
        return this.$http.get(this.Urls.baseApi + 'hotSpotBuckets')
            .then((httpObj) => httpObj.data);
    }

    createHotSpotBucket(hotSpotBucket: IHotSpotBucket): IHttpPromise<IHttpPromiseCallbackArg<any>> {
        return this.$http.post(this.Urls.baseApi + 'hotSpotBuckets', hotSpotBucket);
    }

    editHotSpotBucket(objectId: string, hotSpotBucket: IHotSpotBucket): IHttpPromise<IHttpPromiseCallbackArg<any>> {
        return this.$http.put(this.Urls.baseApi + 'hotSpotBuckets/' + objectId, hotSpotBucket);
    }

    deleteHotSpotBucket(objectId: string): IHttpPromise<IHttpPromiseCallbackArg<any>>{
        return this.$http.delete(this.Urls.baseApi + 'hotSpotBuckets/' + objectId);
    }
}