namespace xrApp {

    angular
        .module('xr.overview')
        .component('reflectionEntry', {
            bindings: {
                reflectionObj: '='
            },
            templateUrl: 'overview/entry/reflectionEntry/reflectionEntry.partial.html',
            controller: 'ReflectionEntryController'
        });
}