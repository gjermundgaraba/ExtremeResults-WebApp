(function () {
    'use strict';

    angular
        .module('xr.reflections')
        .factory('CreateReflectionService', CreateReflectionServiceFactory);

    CreateReflectionServiceFactory.$inject = ['Urls', '$http'];

    function CreateReflectionServiceFactory(Urls, $http) {
        var service = {
            getRelatedEntriesForReflection: getRelatedEntriesForReflection,
            createReflection: createReflection
        };

        return service;

        function getRelatedEntriesForReflection(typeName, effectiveDate) {
            return $http({
                url: Urls.baseApi + 'related/reflections',
                params: {
                    typeName: typeName,
                    effectiveDate: effectiveDate
                }
            })
                .then(function (httpObj) {
                    return httpObj.data;
                });
        }

        function createReflection(reflection) {
            return $http.post(Urls.baseApi + 'reflections', reflection);
        }

    }

})();