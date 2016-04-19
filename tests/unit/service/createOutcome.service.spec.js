import { module, inject } from "angular-mocks";

import "../../../app/outcomes/outcomes.module";

describe('CreateOutcomeService', function(){

    var httpBackend,
        Urls,
        CreateOutcomeService;

    beforeEach(module('xr.outcomes'));
    beforeEach(inject(function($httpBackend, _CreateOutcomeService_, _Urls_) {
        httpBackend = $httpBackend;
        CreateOutcomeService = _CreateOutcomeService_;
        Urls = _Urls_;
    }));

    describe('getRelatedEntriesForOutcome', function () {
        it('should return data on success', function () {
            var typeName = 'test';
            var response = {
                test: 'test'
            };
            httpBackend.whenGET(Urls.baseApi + 'related/outcomes?typeName=' + typeName).respond(200, response);

            var data;
            CreateOutcomeService.getRelatedEntriesForOutcome(typeName)
                .then(function (returnedData) {
                    data = returnedData;
                });

            httpBackend.flush();

            expect(data).toEqual(response);
        });

        it('should return error on failure', function () {
            var typeName = 'test';

            httpBackend.whenGET(Urls.baseApi + 'related/outcomes?typeName=' + typeName).respond(500);

            var failed = false;
            CreateOutcomeService.getRelatedEntriesForOutcome(typeName)
                .catch(function () {
                    failed = true;
                });

            httpBackend.flush();

            expect(failed).toEqual(true);
        });
    });

    describe('createOutcome', function () {
        it('should return on success', function () {
            httpBackend.whenPOST(Urls.baseApi + 'outcomes').respond(201);

            var resolved = false;
            CreateOutcomeService.createOutcome({})
                .then(function () {
                    resolved = true;
                });

            httpBackend.flush();

            expect(resolved).toEqual(true);
        });

        it('should return error on failure', function () {
            httpBackend.whenPOST(Urls.baseApi + 'outcomes').respond(500);

            var failed = false;
            CreateOutcomeService.createOutcome({})
                .catch(function () {
                    failed = true;
                });

            httpBackend.flush();

            expect(failed).toEqual(true);
        });
    });

});