namespace xrApp {

    angular
        .module('xr.overview')
        .component('outcomeEntry', {
            bindings: {
                outcomeObj: '='
            },
            templateUrl: 'overview/entry/outcomeEntry/outcomeEntry.partial.html',
            controller: 'OutcomeEntryController'
        });
}