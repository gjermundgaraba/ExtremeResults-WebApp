import IHttpService = angular.IHttpService;

export class EditReflectionEntryService {
    static $inject = ['Urls', '$http'];

    constructor(private Urls, private $http:IHttpService) {}

    editReflection(objectId, outcome) {
        return this.$http.put(this.Urls.baseApi + 'reflections/' + objectId, outcome);
    }
}