import { module, inject } from "angular-mocks";

import "../../../app/entry/entry.module";

describe('EditReflectionEntryService', function(){

    var httpBackend,
        Urls,
        EditReflectionEntryService;

    beforeEach(module('xr.entry'));
    beforeEach(inject(function($httpBackend, _EditReflectionEntryService_, _Urls_) {
        httpBackend = $httpBackend;
        EditReflectionEntryService = _EditReflectionEntryService_;
        Urls = _Urls_;
    }));

    describe('editReflection', function () {
        it('should return on success', function () {
            var objectId = '123';
            httpBackend.whenPUT(Urls.baseApi + 'reflections/' + objectId).respond(201);

            var resolved = false;
            EditReflectionEntryService.editReflection(objectId)
                .then(function () {
                    resolved = true;
                });

            httpBackend.flush();

            expect(resolved).toEqual(true);
        });

        it('should return error on failure', function () {
            var objectId = '1234';
            httpBackend.whenPUT(Urls.baseApi + 'reflections/' + objectId).respond(500);

            var failed = false;
            EditReflectionEntryService.editReflection(objectId)
                .catch(function () {
                    failed = true;
                });

            httpBackend.flush();

            expect(failed).toEqual(true);
        });
    });

});