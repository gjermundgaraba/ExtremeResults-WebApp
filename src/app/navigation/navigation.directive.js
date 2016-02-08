(function () {
    'use strict';

    angular
        .module('xr.navigation')
        .component('xrNavigation', {
            templateUrl: 'navigation/navigation.partial.html',
            controller: 'NavigationController as vm'
        });


})();