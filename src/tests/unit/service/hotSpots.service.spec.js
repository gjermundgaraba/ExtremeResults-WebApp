'use strict';

describe('HotSpotsService', function(){

    var httpBackend,
        Urls,
        HotSpotsService;

    beforeEach(module('xr.hotSpots'));
    beforeEach(inject(function($httpBackend, _HotSpotsService_, _Urls_) {
        httpBackend = $httpBackend;
        HotSpotsService = _HotSpotsService_;
        Urls = _Urls_;
    }));

    describe('getHotSpotBuckets', function () {
        it('should return data on success', function () {
            var response = {test: 'test'};
            httpBackend.whenGET(Urls.baseApi + 'hotSpotBuckets').respond(200, response);

            var data;
            HotSpotsService.getHotSpotBuckets()
                .then(function (returnedData) {
                    data = returnedData;
                });

            httpBackend.flush();

            expect(data).toEqual(response);
        });

        it('should return error on failure', function () {
            httpBackend.whenGET(Urls.baseApi + 'hotSpotBuckets').respond(500);

            var failed = false;
            HotSpotsService.getHotSpotBuckets()
                .catch(function () {
                    failed = true;
                });

            httpBackend.flush();

            expect(failed).toEqual(true);
        });
    });

    describe('createHotSpotBucket', function () {
        it('should return on success', function () {
            var hotSpotBucket = { test: 'test' };
            httpBackend.whenPOST(Urls.baseApi + 'hotSpotBuckets', hotSpotBucket).respond(201);

            var resolved = false;
            HotSpotsService.createHotSpotBucket(hotSpotBucket)
                .then(function () {
                    resolved = true;
                });

            httpBackend.flush();

            expect(resolved).toEqual(true);
        });

        it('should return error on failure', function () {
            var hotSpotBucket = { test2: 'test2' };
            httpBackend.whenPOST(Urls.baseApi + 'hotSpotBuckets', hotSpotBucket).respond(500);

            var failed = false;
            HotSpotsService.createHotSpotBucket(hotSpotBucket)
                .catch(function () {
                    failed = true;
                });

            httpBackend.flush();

            expect(failed).toEqual(true);
        });
    });

    describe('editHotSpotBucket', function () {
        it('should return on success', function () {
            var objectId = '1234';
            var hotSpotBucket = { test: 'test' };
            httpBackend.whenPUT(Urls.baseApi + 'hotSpotBuckets/' + objectId, hotSpotBucket).respond(201);

            var resolved = false;
            HotSpotsService.editHotSpotBucket(objectId, hotSpotBucket)
                .then(function () {
                    resolved = true;
                });

            httpBackend.flush();

            expect(resolved).toEqual(true);
        });

        it('should return error on failure', function () {
            var objectId = '1234';

            var hotSpotBucket = { test2: 'test2' };
            httpBackend.whenPUT(Urls.baseApi + 'hotSpotBuckets/' + objectId, hotSpotBucket).respond(500);

            var failed = false;
            HotSpotsService.editHotSpotBucket(objectId, hotSpotBucket)
                .catch(function () {
                    failed = true;
                });

            httpBackend.flush();

            expect(failed).toEqual(true);
        });
    });

    describe('deleteHotSpotBucket', function () {
        it('should return on success', function () {
            var objectId = '1234';
            var hotSpotBucket = { test: 'test' };
            httpBackend.whenDELETE(Urls.baseApi + 'hotSpotBuckets/' + objectId).respond(200);

            var resolved = false;
            HotSpotsService.deleteHotSpotBucket(objectId, hotSpotBucket)
                .then(function () {
                    resolved = true;
                });

            httpBackend.flush();

            expect(resolved).toEqual(true);
        });

        it('should return error on failure', function () {
            var objectId = '1234';

            var hotSpotBucket = { test2: 'test2' };
            httpBackend.whenDELETE(Urls.baseApi + 'hotSpotBuckets/' + objectId).respond(500);

            var failed = false;
            HotSpotsService.deleteHotSpotBucket(objectId, hotSpotBucket)
                .catch(function () {
                    failed = true;
                });

            httpBackend.flush();

            expect(failed).toEqual(true);
        });
    });

});