(function () {
    'use strict';

    angular
        .module('xr.overview')
        .component('reflectionEntry', {
            bindings: {
                reflectionObj: '='
            },
            templateUrl: 'overview/entry/reflectionEntry/reflectionEntry.partial.html',
            controller: 'ReflectionEntryController'
        });

})();