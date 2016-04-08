(function () {
    'use strict';

    angular
        .module('xr.overview')
        .factory('OverviewService', OverViewServiceFactory);

    OverViewServiceFactory.$inject = ['Urls', '$http'];

    function OverViewServiceFactory(Urls, $http) {
        var service = {
            getActiveEntries: getActiveEntries
        };

        return service;

        function getActiveEntries() {
            return $http.get(Urls.baseApi + 'activeEntries')
                .then(function (httpObj) {
                    return httpObj.data;
                });
        }

    }

})();