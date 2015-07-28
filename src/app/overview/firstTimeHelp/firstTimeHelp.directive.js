(function () {
    'use strict';

    angular
        .module('xr.overview')
        .directive('firstTimeHelp', firstTimeHelpDirective);

    firstTimeHelpDirective.$inject = [];

    function firstTimeHelpDirective() {
        return {
            restrict: 'AE',
            templateUrl: 'overview/firstTimeHelp/firstTimeHelp.partial.html'
        };
    }

})();