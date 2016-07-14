import IHttpService = angular.IHttpService;

export class EditOutcomeEntryService {
    static $inject = ['Urls', '$http'];

    constructor(private Urls, private $http:IHttpService) {}

    editOutcome(objectId, outcome) {
        return this.$http.put(this.Urls.baseApi + 'outcomes/' + objectId, outcome);
    }

    deleteOutcome(objectId) {
        return this.$http.delete(this.Urls.baseApi + 'outcomes/' + objectId);
    }
}