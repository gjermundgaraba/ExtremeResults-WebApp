(function () {
    'use strict';

    angular.module('xr.auth')
        .factory('AuthService', AuthServiceFactory);

    AuthServiceFactory.$inject = ['$cookies', '$rootScope'];

    function AuthServiceFactory($cookies, $rootScope) {
        var service = {
            login: login
        };

        return service;

        function login() {
            $rootScope.currentUser = {};
            $cookies.put('xrAuthCookie', 'DummyToken');
        }
    }
})();