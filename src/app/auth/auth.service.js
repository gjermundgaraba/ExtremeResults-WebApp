(function () {
    'use strict';

    angular.module('xr.auth')
        .factory('AuthService', AuthServiceFactory);

    AuthServiceFactory.$inject = ['ParseService', '$cookies', '$rootScope', '$q'];

    function AuthServiceFactory(ParseService, $cookies, $rootScope, $q) {
        var service = {
            anyOneLoggedIn: anyOneLoggedIn,
            updateCurrentUser: updateCurrentUser,
            login: login
        };

        return service;

        function anyOneLoggedIn() {
            var authCookie = $cookies.get('xrAuthCookie');
            return (typeof authCookie !== 'undefined');
        }


        function updateCurrentUser() {
            var authCookie = $cookies.get('xrAuthCookie');

            if ((typeof authCookie !== 'undefined') && (typeof $rootScope.currentUser === 'undefined')) {
                return ParseService.retrieveCurrentUser(authCookie)
                    .then(function (user) {
                        $rootScope.currentUser = user;
                    });
            } else {
                return $q.resolve();
            }
        }

        function login(username, password) {
            return ParseService.login(username, password)
                .then(function (user) {
                    $rootScope.currentUser = user;
                    $cookies.put('xrAuthCookie', user.sessionToken);
                });

        }
    }
})();