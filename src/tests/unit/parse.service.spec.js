(function () {
    'use strict';

    describe('ParseService', function(){

        var httpBackend, ParseService, ParseKeyService;

        beforeEach(module('xr.parse'));
        beforeEach(module(function ($provide) {
            ParseKeyService = {
                restUrl: '',
                applicationId: 'appid',
                restApiKey: 'apikey'
            };

            $provide.value('ParseKeyService', ParseKeyService);
        }));
        beforeEach(inject(function($httpBackend, _ParseService_) {
            httpBackend = $httpBackend;
            ParseService = _ParseService_;
        }));

        describe('getAllObjects', function () {
            it('should return data on successful GET call', function () {
                httpBackend.whenGET('/classes/test').respond(200, {results: [{}, {}]});

                var data;
                ParseService.getAllObjects('test').then(function(returnData) {
                    data = returnData;
                });

                httpBackend.flush();
                expect(data).toBeDefined();
                expect(data.length).toBe(2);
            });

            it('should return an error when GET call fails', function () {
                httpBackend.whenGET('/classes/test').respond(500, {error: 'server error'});

                var error;
                ParseService.getAllObjects('test').catch(function (e) {
                    error = e;
                });

                httpBackend.flush();
                expect(error).toBeDefined();
            })
        });

        describe('postObject', function () {
            it('should return objectId and createdAt on successful POST call', function() {
                httpBackend.whenPOST('/classes/test').respond(201, {
                    "createdAt": "2015-04-03T09:45:21.887Z",
                    "objectId": "NffSHE7a8T"
                });

                var data;
                ParseService.postObject('test', {}).then(function(returnData) {
                    data = returnData;
                });

                httpBackend.flush();
                expect(data).toBeDefined();
                expect(data.createdAt).toBe("2015-04-03T09:45:21.887Z");
                expect(data.objectId).toBe("NffSHE7a8T");

            });
        });

        describe('callFunction', function () {
            it('should return data on successful POST call', function () {
                httpBackend.whenPOST('/functions/test').respond(200, {result: [{}, {}]});

                var data;
                ParseService.callFunction('test').then(function(returnData) {
                    data = returnData;
                });

                httpBackend.flush();
                expect(data).toBeDefined();
                expect(data.length).toBe(2);
            });

            it('should return an error when POST call fails', function () {
                httpBackend.whenPOST('/functions/test').respond(500, {error: 'server error'});

                var error;
                ParseService.callFunction('test').catch(function (e) {
                    error = e;
                });

                httpBackend.flush();
                expect(error).toBeDefined();
            })
        });

        describe('headers', function () {
            it('should set appropriate headers for GET', function () {
                httpBackend.expectGET('/classes/test', function(headers) {
                    return (headers['X-Parse-Application-Id'] === ParseKeyService.applicationId)
                            &&
                            (headers['X-Parse-REST-API-Key'] === ParseKeyService.restApiKey);
                }).respond(200, {});

                ParseService.getAllObjects('test');

                httpBackend.flush();
            });

            it('should set appropriate headers for POST', function () {
                httpBackend.expectPOST('/classes/test', {}, function(headers) {
                    return (headers['X-Parse-Application-Id'] === ParseKeyService.applicationId)
                        &&
                        (headers['X-Parse-REST-API-Key'] === ParseKeyService.restApiKey);
                }).respond(201, {});

                ParseService.postObject('test', {});

                httpBackend.flush();
            });
        });

    });
})();