import IHttpService = angular.IHttpService;
import IPromise = angular.IPromise;

export class CreateOutcomeService {
    static $inject = ['Urls', '$http'];

    constructor(private Urls, private $http:IHttpService) {}

    getRelatedEntriesForOutcome(typeName: string): IPromise<any> {
        return this.$http.get(this.Urls.baseApi + 'related/outcomes?typeName=' + typeName)
            .then(httpObj => httpObj.data);
    }

    createOutcome(outcome) {
        return this.$http.post(this.Urls.baseApi + 'outcomes', outcome);
    }
}