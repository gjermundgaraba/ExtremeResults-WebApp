(function () {
    'use strict';

    angular
        .module('xr.createOutcome')
        .factory('CreateOutcomeService', CreateOutcomeServiceFactory);

    CreateOutcomeServiceFactory.$inject = ['Urls', '$http'];

    function CreateOutcomeServiceFactory(Urls, $http) {
        var service = {
            getRelatedEntriesForOutcome: getRelatedEntriesForOutcome,
            createOutcome: createOutcome
        };

        return service;

        function getRelatedEntriesForOutcome(typeName) {
            return $http.get(Urls.baseApi + 'related/outcomes?typeName=' + typeName)
                .then(function (httpObj) {
                    return httpObj.data;
                });
        }

        function createOutcome(outcome) {
            return $http.post(Urls.baseApi + 'outcomes', outcome);
        }

    }

})();