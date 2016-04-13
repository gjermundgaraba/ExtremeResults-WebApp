namespace xrApp {

    angular.module('xr.auth')
        .factory('AuthService', AuthServiceFactory);

    AuthServiceFactory.$inject = ['jwtHelper', 'Urls', '$cookies', '$http'];

    function AuthServiceFactory(jwtHelper, Urls, $cookies, $http) {
        var service = {
            anyOneLoggedIn: anyOneLoggedIn,
            getCurrentUser: getCurrentUser,
            getUserToken: getUserToken,
            login: login,
            logout: logout,
            register: register
        };

        return service;

        function anyOneLoggedIn() {
            var authCookie = getUserToken();
            return (typeof authCookie !== 'undefined');
        }

        function getCurrentUser() {
            var token = getUserToken();
            var tokenPayload = jwtHelper.decodeToken(token);
            return tokenPayload;
        }

        function getUserToken() {
            return $cookies.get('xrAuthCookie');
        }

        function login(username, password) {
            var userLogin = {
                username: username,
                password: password
            };

            return $http.post(Urls.baseApi + 'login', userLogin)
                .then(function (loginObj) {
                    $cookies.put('xrAuthCookie', loginObj.data.token);
                });
        }

        function logout() {
            $cookies.remove('xrAuthCookie');
        }

        function register(user) {
            return $http.post(Urls.baseApi + 'register', user)
                .then(function (registerObj) {
                    $cookies.put('xrAuthCookie', registerObj.data.token);
                });
        }
    }
}