'use strict';

describe('CreateReflectionService', function(){

    var httpBackend,
        Urls,
        CreateReflectionService;

    beforeEach(module('xr.reflections'));
    beforeEach(inject(function($httpBackend, _CreateReflectionService_, _Urls_) {
        httpBackend = $httpBackend;
        CreateReflectionService = _CreateReflectionService_;
        Urls = _Urls_;
    }));

    describe('getRelatedEntriesForReflection', function () {
        it('should return data on success', function () {
            var typeName = 'test';
            var response = {
                test: 'test'
            };
            httpBackend.whenGET(Urls.baseApi + 'related/reflections?typeName=' + typeName).respond(200, response);

            var data;
            CreateReflectionService.getRelatedEntriesForReflection(typeName)
                .then(function (returnedData) {
                    data = returnedData;
                });

            httpBackend.flush();

            expect(data).toEqual(response);
        });

        it('should return error on failure', function () {
            var typeName = 'test';

            httpBackend.whenGET(Urls.baseApi + 'related/reflections?typeName=' + typeName).respond(500);

            var failed = false;
            CreateReflectionService.getRelatedEntriesForReflection(typeName)
                .catch(function () {
                    failed = true;
                });

            httpBackend.flush();

            expect(failed).toEqual(true);
        });
    });

    describe('createReflection', function () {
        it('should return on success', function () {
            httpBackend.whenPOST(Urls.baseApi + 'reflections').respond(201);

            var resolved = false;
            CreateReflectionService.createReflection({})
                .then(function () {
                    resolved = true;
                });

            httpBackend.flush();

            expect(resolved).toEqual(true);
        });

        it('should return error on failure', function () {
            httpBackend.whenPOST(Urls.baseApi + 'reflections').respond(500);

            var failed = false;
            CreateReflectionService.createReflection({})
                .catch(function () {
                    failed = true;
                });

            httpBackend.flush();

            expect(failed).toEqual(true);
        });
    });

});