(function () {
    'use strict';

    angular
        .module('xr.config')
        .config(['$httpProvider', function ($httpProvider) {
            $httpProvider.interceptors.push('httpHeaderInterceptor');
        }]);

})();