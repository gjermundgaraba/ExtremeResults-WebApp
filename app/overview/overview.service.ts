OverviewServiceFactory.$inject = ['Urls', '$http'];

function OverviewServiceFactory(Urls, $http) {
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

export {OverviewServiceFactory}