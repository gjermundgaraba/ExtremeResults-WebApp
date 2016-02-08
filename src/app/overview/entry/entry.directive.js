(function () {
    'use strict';

    angular
        .module('xr.overview')
        .component('overviewEntry', {
            restrict: 'AE',
            replace: true,
            bindings: {
                entryObj: '='
            },
            templateUrl: 'overview/entry/entry.partial.html',
            controller: function () {},
            controllerAs: 'vm'
        });

})();