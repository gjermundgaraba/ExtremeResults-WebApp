'use strict';

describe('OverviewService', function(){

    var httpBackend,
        Urls,
        OverviewService;

    beforeEach(module('xr.overview'));
    beforeEach(inject(function($httpBackend, _OverviewService_, _Urls_) {
        httpBackend = $httpBackend;
        OverviewService = _OverviewService_;
        Urls = _Urls_;
    }));

    describe('getActiveEntries', function () {
        it('should return data on success', function () {
            var response = {
                test: 'test'
            };
            httpBackend.whenGET(Urls.baseApi + 'activeEntries').respond(200, response);

            var data;
            OverviewService.getActiveEntries()
                .then(function (returnedData) {
                    data = returnedData;
                });

            httpBackend.flush();

            expect(data).toEqual(response);
        });

        it('should return error on failure', function () {
            httpBackend.whenGET(Urls.baseApi + 'activeEntries').respond(500);

            var failed = false;
            OverviewService.getActiveEntries()
                .catch(function () {
                    failed = true;
                });

            httpBackend.flush();

            expect(failed).toEqual(true);
        });
    });

});