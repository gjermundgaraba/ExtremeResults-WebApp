import IHttpService = angular.IHttpService;
import IPromise = angular.IPromise;

export class OverviewService {
    static $inject = ['Urls', '$http'];

    constructor(private Urls, private $http: IHttpService) {}

    getActiveEntries(): IPromise<any> {
        return this.$http.get(this.Urls.baseApi + 'activeEntries')
            .then(httpObj => httpObj.data);
    }
}