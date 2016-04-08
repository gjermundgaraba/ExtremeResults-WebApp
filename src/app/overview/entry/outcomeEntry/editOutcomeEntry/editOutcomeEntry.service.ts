(function () {
    'use strict';

    angular
        .module('xr.overview')
        .factory('EditOutcomeEntryService', CreateOutcomeServiceFactory);

    CreateOutcomeServiceFactory.$inject = ['Urls', '$http'];

    function CreateOutcomeServiceFactory(Urls, $http) {
        var service = {
            editOutcome: editOutcome
        };

        return service;

        function editOutcome(objectId, outcome) {
            return $http.put(Urls.baseApi + 'outcomes/' + objectId, outcome);
        }
    }

})();