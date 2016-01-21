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

    describe('login', function () {
        it('should return data on successful POST call', function () {
            httpBackend.whenGET('/login?password=test&username=test').respond(200, {sessionToken: 'token2323423'});

            var data;
            ParseService.login('test', 'test').then(function(returnData) {
                data = returnData;
            });

            httpBackend.flush();
            expect(data).toBeDefined();
        });

        it('should return an error when POST call fails', function () {
            httpBackend.whenGET('/login?password=test&username=test').respond(500, {error: 'server error'});

            var error;
            ParseService.login('test', 'test').catch(function (e) {
                error = e;
            });

            httpBackend.flush();
            expect(error).toBeDefined();
        });
    });

    describe('register', function () {
        var user;

        beforeEach(function () {
            user = {
                username: 'test',
                password: 'test'
            }
        });

        it('should return data on successful POST call', function () {
            var response = {
                createdAt: "2011-11-07T20:58:34.448Z",
                objectId: "g7y9tkhB7O",
                sessionToken: "r:pnktnjyb996sj4p156gjtp4im"
            };
            httpBackend.whenPOST('/users').respond(201, response);

            var data;
            ParseService.register(user).then(function(returnData) {
                data = returnData;
            });

            httpBackend.flush();
            expect(data.createdAt).toBe(response.createdAt);
            expect(data.objectId).toBe(response.objectId);
            expect(data.sessionToken).toBe(response.sessionToken);
        });

        it('should return an error when GET call fails', function () {
            var errorResponse = {error: 'server error'};
            httpBackend.whenPOST('/users').respond(500, errorResponse);

            var error;
            ParseService.register(user).catch(function (e) {
                error = e;
            });

            httpBackend.flush();
            expect(error).toBeDefined();
        })
    });

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

    describe('updateObject', function () {
        it('should return data on successful PUT call', function () {
            var object = {
                className: 'derp',
                updatedAt: '2011-08-21T14:00:00.123Z'
            };
            var result = {
                updatedAt: '2011-08-21T18:02:52.248Z'
            };
            httpBackend.whenPUT('/classes/test/objidthingy').respond(200, result);

            var data;
            ParseService.updateObject('test', 'objidthingy', object).then(function(returnData) {
                data = returnData;
            });

            httpBackend.flush();
            expect(data).toBeDefined();
            expect(data).toBe(result.updatedAt);
        });
    });

    describe('deleteObject', function () {
        it('should resolve on success', function () {
            var className = 'test';
            var id = 'objid';

            httpBackend.whenDELETE('/classes/' + className + '/' + id).respond(201);

            var resolved = false;
            ParseService.deleteObject(className, id).then(function () {
                resolved = true;
            });

            httpBackend.flush();
            expect(resolved).toBe(true);
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
        });
    });

    describe('retrieveCurrentUser', function () {
        it('should return data on successful POST call', function () {
            httpBackend.whenGET('/users/me').respond(200, {username: 'test'});

            var data;
            ParseService.retrieveCurrentUser('testAuthKey').then(function(returnData) {
                data = returnData;
            });

            httpBackend.flush();
            expect(data).toBeDefined();
        });

        it('should return an error when POST call fails', function () {
            httpBackend.whenGET('/users/me').respond(500, {error: 'server error'});

            var error;
            ParseService.retrieveCurrentUser('testAuthKey').catch(function (e) {
                error = e;
            });

            httpBackend.flush();
            expect(error).toBeDefined();
        });

        it('should set set the auth key in the header', function () {
            httpBackend.expectGET('/users/me', function(headers) {
                return (headers['X-Parse-Session-Token'] === 'testAuthKey');
            }).respond(200, {});

            ParseService.retrieveCurrentUser('testAuthKey');

            httpBackend.flush();
        });
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