/* Sets up applicationId and restApiKey values to be picked up and changed by gulp script */

(function () {
    'use strict';

    angular.module('xr.config')
        .config(['ParseKeyServiceProvider', function (ParseKeyServiceProvider) {
            ParseKeyServiceProvider.applicationId = '<!APPLICATION-ID!>';
            ParseKeyServiceProvider.restApiKey = '<!REST-API-KEY!>';
        }]);
})();