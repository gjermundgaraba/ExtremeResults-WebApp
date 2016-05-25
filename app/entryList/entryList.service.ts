import IHttpService = angular.IHttpService;
import IPromise = angular.IPromise;

export class EntryListService {
    static $inject = ['Urls', '$http'];

    constructor(private Urls, private $http:IHttpService) {}

    getOutcomes(offset: Number): IPromise<any> {
        return this.$http.get(this.Urls.baseApi + 'outcomes?offset=' + offset + '&limit=5')
            .then(httpObj => httpObj.data);
    }

    getReflections(offset: Number): IPromise<any> {
        return this.$http.get(this.Urls.baseApi + 'reflections?offset=' + offset + '&limit=5')
            .then(httpObj => httpObj.data);
    }

}