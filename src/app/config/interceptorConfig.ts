namespace xrApp {

    angular
        .module('xr.config')
        .config(['$httpProvider', function ($httpProvider) {
            $httpProvider.interceptors.push('httpHeaderInterceptor');
        }]);
}