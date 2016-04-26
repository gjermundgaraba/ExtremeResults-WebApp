import IHttpService = angular.IHttpService;
import IPromise = angular.IPromise;
import IHttpPromise = angular.IHttpPromise;

export class CreateReflectionService {

    static $inject = ['Urls', '$http'];

    constructor(private Urls, private $http: IHttpService) {
    }

    getRelatedEntriesForReflection(typeName: string, effectiveDate: Date): IPromise<any> {
        return this.$http({
                method: 'GET',
                url: this.Urls.baseApi + 'related/reflections',
                params: {
                    typeName: typeName,
                    effectiveDate: effectiveDate
                }
            })
            .then(function (httpObj) {
                return httpObj.data;
            });
    }

    createReflection(reflection): IHttpPromise<any> {
        return this.$http.post(this.Urls.baseApi + 'reflections', reflection);
    }

}