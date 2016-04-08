(function () {
    'use strict';

    describe('Overview Controller', function(){

        var controller,
            OverviewServiceMock,
            rootScope,
            initDeferred,
            q;

        beforeEach(module('xr.overview'));
        beforeEach(module(function ($provide) {

            OverviewServiceMock = {
                getActiveEntries: function () {}
            };

            $provide.value('OverviewService', OverviewServiceMock);
        }));
        beforeEach(inject(function($controller, $q, $rootScope) {
            q = $q;
            rootScope = $rootScope;

            initDeferred = q.defer();
            spyOn(OverviewServiceMock, 'getActiveEntries').and.returnValue(initDeferred.promise);

            controller = $controller('OverviewController');
        }));

        describe('init', function () {

            it('should set set up with empty array of overview', function() {
                expect(controller.overviewEntries).toBeDefined();
                expect(controller.overviewEntries.length).toBe(0);
            });

            it('should get active entries', function () {
                expect(OverviewServiceMock.getActiveEntries).toHaveBeenCalled();
            });

            it('should update array of overviews when entries get back from service', function () {
                var resolvedData = [{something: null}, {somethingElse: 'Derp'}];

                initDeferred.resolve(resolvedData);
                rootScope.$digest();

                expect(controller.activeEntries).toBe(resolvedData);
            });
        });

    });
})();