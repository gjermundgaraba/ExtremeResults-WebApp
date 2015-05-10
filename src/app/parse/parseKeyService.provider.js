(function () {
    angular.module('xr.parse')
        .provider('ParseKeyService', ParseKeyServiceProvider);

    function ParseKeyServiceProvider() {
        this.baseUrl = 'https://api.parse.com';
        this.restVersion = '1';
        this.applicationId = '';
        this.restApiKey = '';

        this.$get = function() {
            return {
                restUrl: this.baseUrl + '/' + this.restVersion,
                applicationId: this.applicationId,
                restApiKey: this.restApiKey
            }
        }
    }
})();