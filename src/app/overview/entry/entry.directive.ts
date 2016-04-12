(function () {
    'use strict';

    angular
        .module('xr.overview')
        .component('overviewEntry', {
            bindings: {
                entryObj: '='
            },
            templateUrl: 'overview/entry/entry.partial.html'
        });

})();