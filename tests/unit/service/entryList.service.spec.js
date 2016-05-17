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
            httpBackend.whenGET(Urls.baseApi + 'outcomes').respond(200, response);

            var data;
            EntryListService.getOutcomes()
                .then(function (returnedData) {
                    data = returnedData;
                });

            httpBackend.flush();

            expect(data).toEqual(response);
        });

        it('should return error on failure', function () {
            httpBackend.whenGET(Urls.baseApi + 'outcomes').respond(500);

            var failed = false;
            EntryListService.getOutcomes()
                .catch(function () {
                    failed = true;
                });

            httpBackend.flush();

            expect(failed).toEqual(true);
        });
    });

    describe('getReflections', function () {
        it('should return data on success', function () {
            var response = {
                test: 'test'
            };
            httpBackend.whenGET(Urls.baseApi + 'reflections').respond(200, response);

            var data;
            EntryListService.getReflections()
                .then(function (returnedData) {
                    data = returnedData;
                });

            httpBackend.flush();

            expect(data).toEqual(response);
        });

        it('should return error on failure', function () {
            httpBackend.whenGET(Urls.baseApi + 'reflections').respond(500);

            var failed = false;
            EntryListService.getReflections()
                .catch(function () {
                    failed = true;
                });

            httpBackend.flush();

            expect(failed).toEqual(true);
        });
    });


});