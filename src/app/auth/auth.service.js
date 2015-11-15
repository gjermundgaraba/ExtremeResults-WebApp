(function () {
    'use strict';

    angular.module('xr.auth')
        .factory('AuthService', AuthServiceFactory);

    AuthServiceFactory.$inject = ['ParseService', '$cookies', '$q'];

    function AuthServiceFactory(ParseService, $cookies, $q) {
        var currentUser;

        var service = {
            anyOneLoggedIn: anyOneLoggedIn,
            getCurrentUser: getCurrentUser,
            getUserToken: getUserToken,
            updateCurrentUser: updateCurrentUser,
            login: login,
            logout: logout,
            register: register
        };

        return service;

        function anyOneLoggedIn() {
            var authCookie = $cookies.get('xrAuthCookie');
            return (typeof authCookie !== 'undefined');
        }

        function getCurrentUser() {
            return currentUser;
        }

        function getUserToken() {
            return currentUser.sessionToken;
        }

        function updateCurrentUser() {
            var authCookie = $cookies.get('xrAuthCookie');

            if ((typeof authCookie !== 'undefined') && (typeof currentUser === 'undefined')) {
                return ParseService.retrieveCurrentUser(authCookie)
                    .then(function (user) {
                        currentUser = user;
                    });
            } else {
                return $q.resolve();
            }
        }

        function login(username, password) {
            return ParseService.login(username, password)
                .then(function (user) {
                    currentUser = user;
                    $cookies.put('xrAuthCookie', user.sessionToken);
                });
        }

        function logout() {
            $cookies.remove('xrAuthCookie');
            currentUser = undefined;
        }

        function register(user) {
            return ParseService.register(user)
                .then(function (registerObj) {
                    user.objectId = registerObj.objectId;
                    user.sessionToken = registerObj.sessionToken;
                    currentUser = user;
                    $cookies.put('xrAuthCookie', user.sessionToken);
                });
        }
    }
})();