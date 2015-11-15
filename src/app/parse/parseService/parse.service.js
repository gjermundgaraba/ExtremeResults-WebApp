(function () {
    'use strict';

    angular.module('xr.parse')
        .factory('ParseService', ParseServiceFactory);

    ParseServiceFactory.$inject = ['ParseKeyService', '$http', '$q'];

    function ParseServiceFactory(ParseKeyService, $http, $q) {
        var service = {
            login: login,
            register: register,
            getAllObjects: getAllObjects,
            postObject: postObject,
            updateObject: updateObject,
            callFunction: callFunction,
            retrieveCurrentUser: retrieveCurrentUser
        };

        var config = {
            headers: {
                'X-Parse-Application-Id': ParseKeyService.applicationId,
                'X-Parse-REST-API-Key': ParseKeyService.restApiKey
            }
        };

        return service;

        function login(username, password) {
            var configWithToken = getConfigCopy();
            configWithToken.params = {
                username: username,
                password: password
            };

            return $http.get(ParseKeyService.restUrl + '/login', configWithToken)
                .then(function (httpObj) {
                    return httpObj.data;
                });
        }

        function register(user) {
            return $http.post(ParseKeyService.restUrl + '/users', user, config)
                .then(function (httpObj) {
                    return httpObj.data;
                })
                .catch(function (httpErrorObj) {
                    return $q.reject('Could not register new user: "' +
                        httpErrorObj.data.error + '" (' + httpErrorObj.status + ')');
                });
        }

        function getAllObjects(className, token) {
            var configWithToken = getConfigCopyWithToken(token);

            return $http.get(ParseKeyService.restUrl + '/classes/' + className, configWithToken)
                .then(function (httpObj) {
                    return httpObj.data.results;
                })
                .catch(function (httpErrorObj) {
                    return $q.reject('Could not get objects: "' +
                        httpErrorObj.data.error + '" (' + httpErrorObj.status + ')');
                });
        }

        function postObject(className, object, token) {
            var configWithToken = getConfigCopyWithToken(token);

            return $http.post(ParseKeyService.restUrl + '/classes/' + className, object, configWithToken)
                .then(function(httpObj) {
                    return httpObj.data;
                });
        }

        function updateObject(className, id, updateObject, token) {
            var configWithToken = getConfigCopyWithToken(token);

            return $http.put(ParseKeyService.restUrl + '/classes/' + className + '/' +
                        id, updateObject, configWithToken)
                .then(function (httpObj) {
                    return httpObj.data.updatedAt;
                });
        }

        function callFunction(functionName, data, token) {
            var configWithToken = getConfigCopyWithToken(token);

            return $http.post(ParseKeyService.restUrl + '/functions/' + functionName, data, configWithToken)
                .then(function (httpObj) {
                    return httpObj.data.result;
                })
                .catch(function (httpErrorObj) {
                    return $q.reject('Could not call function: ' + functionName + ' "' +
                        httpErrorObj.data.error + '" (' + httpErrorObj.status + ')');
                });
        }

        function retrieveCurrentUser(token) {
            var configWithToken = getConfigCopyWithToken(token);

            return $http.get(ParseKeyService.restUrl + '/users/me', configWithToken)
                .then(function (httpObj) {
                    return httpObj.data;
                });
        }

        function getConfigCopyWithToken(token) {
            var configCopy = getConfigCopy();
            configCopy.headers['X-Parse-Session-Token'] = token;

            return configCopy;
        }

        function getConfigCopy() {
            return JSON.parse(JSON.stringify(config));
        }
    }


})();