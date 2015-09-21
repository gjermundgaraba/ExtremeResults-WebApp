(function () {
    'use strict';

    angular.module('xr.parse')
        .factory('ParseService', ParseServiceFactory);

    ParseServiceFactory.$inject = ['ParseKeyService', '$http', '$q'];

    function ParseServiceFactory(ParseKeyService, $http, $q) {
        var service = {
            login: login,
            getAllObjects: getAllObjects,
            postObject: postObject,
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



        function getAllObjects(className) {
            return $http.get(ParseKeyService.restUrl + '/classes/' + className, config)
                .then(function (httpObj) {
                    return httpObj.data.results;
                })
                .catch(function (httpErrorObj) {
                    return $q.reject('Could not get objects: "' +
                        httpErrorObj.data.error + '" (' + httpErrorObj.status + ')');
                });
        }

        function postObject(className, object) {
            return $http.post(ParseKeyService.restUrl + '/classes/' + className, object, config)
                .then(function(httpObj) {
                    return httpObj.data;
                });

        }

        function callFunction(functionName, data) {
            return $http.post(ParseKeyService.restUrl + '/functions/' + functionName, data, config)
                .then(function (httpObj) {
                    return httpObj.data.result;
                })
                .catch(function (httpErrorObj) {
                    return $q.reject('Could not call function: ' + functionName + ' "' +
                        httpErrorObj.data.error + '" (' + httpErrorObj.status + ')');
                });
        }

        function login(username, password) {
            config.params = {
                username: username,
                password: password
            };

            return $http.get(ParseKeyService.restUrl + '/login', config)
                .then(function (httpObj) {
                    return httpObj.data;
                });
        }

        function retrieveCurrentUser(token) {
            var configCopy = getConfigCopy();
            configCopy.headers['X-Parse-Session-Token'] = token;

            return $http.get(ParseKeyService.restUrl + '/users/me', configCopy)
                .then(function (httpObj) {
                    return httpObj.data;
                });
        }

        function getConfigCopy() {
            return JSON.parse(JSON.stringify(config));
        }
    }


})();