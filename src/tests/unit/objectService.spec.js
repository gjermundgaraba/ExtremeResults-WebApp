(function () {
    'use strict';

    describe('ParseObjectService', function(){

        var httpBackend, ParseObjectServiceTestObject, ParseKeyService;

        beforeEach(module('xr.parse'));
        beforeEach(module(function ($provide) {
            ParseKeyService = {
                restUrl: '',
                applicationId: 'appid',
                restApiKey: 'apikey'
            };

            $provide.value('ParseKeyService', ParseKeyService);
        }));
        beforeEach(inject(function($httpBackend, ParseObjectService) {
            httpBackend = $httpBackend;
            ParseObjectServiceTestObject = ParseObjectService;
        }));

        describe('GET all objects of a class', function () {
            it('should return data on successful GET call', function () {
                httpBackend.whenGET('/classes/test').respond(200, {results: [{}, {}]});

                var data;
                ParseObjectServiceTestObject.getAllObjects('test').then(function(returnData) {
                    data = returnData;
                });

                httpBackend.flush();
                expect(data).toBeDefined();
                expect(data.length).toBe(2);
            });

            it('should return an error when GET call fails', function () {
                httpBackend.whenGET('/classes/test').respond(500, {error: 'server error'});

                var error;
                ParseObjectServiceTestObject.getAllObjects('test').catch(function (e) {
                    error = e;
                });

                httpBackend.flush();
                expect(error).toBeDefined();
            })
        });

        describe('POST a new object to a class', function () {
            it('should return objectId and createdAt on successful POST call', function() {
                httpBackend.whenPOST('/classes/test').respond(201, {
                    "createdAt": "2015-04-03T09:45:21.887Z",
                    "objectId": "NffSHE7a8T"
                });

                var data;
                ParseObjectServiceTestObject.postObject('test', {}).then(function(returnData) {
                    data = returnData;
                });

                httpBackend.flush();
                expect(data).toBeDefined();
                expect(data.createdAt).toBe("2015-04-03T09:45:21.887Z");
                expect(data.objectId).toBe("NffSHE7a8T");

            });
        });

        describe('headers', function () {
            it('should set appropriate headers for GET', function () {
                httpBackend.expectGET('/classes/test', function(headers) {
                    return (headers['X-Parse-Application-Id'] === ParseKeyService.applicationId)
                            &&
                            (headers['X-Parse-REST-API-Key'] === ParseKeyService.restApiKey);
                }).respond(200, {});

                ParseObjectServiceTestObject.getAllObjects('test');

                httpBackend.flush();
            });

            it('should set appropriate headers for POST', function () {
                httpBackend.expectPOST('/classes/test', {}, function(headers) {
                    return (headers['X-Parse-Application-Id'] === ParseKeyService.applicationId)
                        &&
                        (headers['X-Parse-REST-API-Key'] === ParseKeyService.restApiKey);
                }).respond(201, {});

                ParseObjectServiceTestObject.postObject('test', {});

                httpBackend.flush();
            });
        });

    });
})();