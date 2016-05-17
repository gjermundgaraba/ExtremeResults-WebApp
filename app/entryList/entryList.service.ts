import IHttpService = angular.IHttpService;
import IPromise = angular.IPromise;

export class EntryListService {
    static $inject = ['Urls', '$http'];

    constructor(private Urls, private $http:IHttpService) {}

    getOutcomes(): IPromise<any> {
        return this.$http.get(this.Urls.baseApi + 'outcomes')
            .then(httpObj => httpObj.data);
    }

    getReflections(): IPromise<any> {
        return this.$http.get(this.Urls.baseApi + 'reflections')
            .then(httpObj => httpObj.data);
    }

}