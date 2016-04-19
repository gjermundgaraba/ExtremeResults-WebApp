EditOutcomeEntryServiceFactory.$inject = ['Urls', '$http'];

function EditOutcomeEntryServiceFactory(Urls, $http) {
    var service = {
        editOutcome: editOutcome
    };

    return service;

    function editOutcome(objectId, outcome) {
        return $http.put(Urls.baseApi + 'outcomes/' + objectId, outcome);
    }
}

export {EditOutcomeEntryServiceFactory};