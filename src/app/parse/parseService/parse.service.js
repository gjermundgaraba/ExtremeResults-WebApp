(function () {
    'use strict';

    angular.module('xr.parse')
        .factory('ParseService', ParseServiceFactory);

    ParseServiceFactory.$inject = ['ParseKeyService', '$http', '$q'];

    function ParseServiceFactory(ParseKeyService, $http, $q) {
        var service = {
            getAllObjects: getAllObjects,
            postObject: postObject,
            callFunction: callFunction
        };

        return service;

        function getAllObjects(className) {
            var config = {
                headers: {
                    'X-Parse-Application-Id': ParseKeyService.applicationId,
                    'X-Parse-REST-API-Key': ParseKeyService.restApiKey
                }
            };

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
            var config = {
                headers: {
                    'X-Parse-Application-Id': ParseKeyService.applicationId,
                    'X-Parse-REST-API-Key': ParseKeyService.restApiKey
                }
            };

            return $http.post(ParseKeyService.restUrl + '/classes/' + className, object, config)
                .then(function(httpObj) {
                    return httpObj.data;
                });

        }

        function callFunction(functionName) {
            var config = {
                headers: {
                    'X-Parse-Application-Id': ParseKeyService.applicationId,
                    'X-Parse-REST-API-Key': ParseKeyService.restApiKey
                }
            };

            return $http.post(ParseKeyService.restUrl + '/functions/' + functionName, null, config)
                .then(function (httpObj) {
                    return httpObj.data.result;
                })
                .catch(function (httpErrorObj) {
                    return $q.reject('Could not get objects: "' +
                        httpErrorObj.data.error + '" (' + httpErrorObj.status + ')');
                });
        }
    }


})();