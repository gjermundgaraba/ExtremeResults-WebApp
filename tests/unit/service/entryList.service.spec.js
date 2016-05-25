import { module, inject } from "angular-mocks";

import "../../../app/entryList/entryList.module";

describe('EntryList Service', function(){

    var httpBackend,
        Urls,
        EntryListService;

    beforeEach(module('xr.entryList'));
    beforeEach(inject(function($httpBackend, _EntryListService_, _Urls_) {
        httpBackend = $httpBackend;
        EntryListService = _EntryListService_;
        Urls = _Urls_;
    }));

    describe('getOutcomes', function () {
        it('should return data on success', function () {
            var response = {
                test: 'test'
            };
            httpBackend.whenGET(Urls.baseApi + 'outcomes?offset=0&limit=5').respond(200, response);

            var data;
            EntryListService.getOutcomes(0)
                .then(function (returnedData) {
                    data = returnedData;
                });

            httpBackend.flush();

            expect(data).toEqual(response);
        });

        it('should return error on failure', function () {
            httpBackend.whenGET(Urls.baseApi + 'outcomes?offset=0&limit=5').respond(500);

            var failed = false;
            EntryListService.getOutcomes(0)
                .catch(function () {
                    failed = true;
                });

            httpBackend.flush();

            expect(failed).toEqual(true);
        });

        it('should set offset', function () {
            httpBackend.expectGET(Urls.baseApi + 'outcomes?offset=5&limit=5').respond(200);

            EntryListService.getOutcomes(5);

            httpBackend.flush();
        });
    });

    describe('getReflections', function () {
        it('should return data on success', function () {
            var response = {
                test: 'test'
            };
            httpBackend.whenGET(Urls.baseApi + 'reflections?offset=0&limit=5').respond(200, response);

            var data;
            EntryListService.getReflections(0)
                .then(function (returnedData) {
                    data = returnedData;
                });

            httpBackend.flush();

            expect(data).toEqual(response);
        });

        it('should return error on failure', function () {
            httpBackend.whenGET(Urls.baseApi + 'reflections?offset=0&limit=5').respond(500);

            var failed = false;
            EntryListService.getReflections(0)
                .catch(function () {
                    failed = true;
                });

            httpBackend.flush();

            expect(failed).toEqual(true);
        });

        it('should set offset', function () {
            httpBackend.expectGET(Urls.baseApi + 'reflections?offset=5&limit=5').respond(200);

            EntryListService.getReflections(5);

            httpBackend.flush();
        });
    });


});