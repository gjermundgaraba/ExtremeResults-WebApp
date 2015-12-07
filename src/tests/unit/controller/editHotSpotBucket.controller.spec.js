(function () {
    'use strict';

    describe('Edit Hot Spot Bucket Controller', function(){

        var q,
            rootScope,
            mdDialogMock,
            ParseServiceMock,
            AuthServiceMock,
            controller;

        beforeEach(module('xr.hotSpots'));
        beforeEach(module(function ($provide) {

            mdDialogMock = {
                hide: function () {}
            };

            ParseServiceMock = {
                updateObject: function () {}
            };

            AuthServiceMock = {
                getUserToken: function () {}
            };

            $provide.value('$mdDialog', mdDialogMock);
            $provide.value('ParseService', ParseServiceMock);
            $provide.value('AuthService', AuthServiceMock);
        }));
        beforeEach(inject(function($controller, $q, $rootScope) {
            q = $q;
            rootScope = $rootScope;

            controller = $controller('EditHotSpotBucketController');
        }));

        describe('init', function () {

            it('should set saving to false', function () {
                expect(controller.saving).toBe(false);
            });
        });

        describe('save', function () {
            var hotSpotBucket,
                updateDeferred;

            beforeEach(function () {
                hotSpotBucket = {
                    name: 'test',
                    hotSpots: []
                };

                controller.hotSpotBucket = hotSpotBucket;

                updateDeferred = q.defer();
                spyOn(ParseServiceMock, 'updateObject').and.returnValue(updateDeferred.promise);
            });

            it('should set saving flag when saving', function () {
                controller.save();

                expect(controller.saving).toBe(true);
            });

            it('should not call update when already saving', function () {
                controller.save();
                controller.save();
                controller.save();

                expect(ParseServiceMock.updateObject.calls.count()).toBe(1); // 1 because it will be called the first time
            });

            it('should hide the dialog when succeeded', function () {
                spyOn(mdDialogMock, 'hide');
                controller.save();

                updateDeferred.resolve();
                rootScope.$digest();

                expect(mdDialogMock.hide).toHaveBeenCalled();
            });

            it('should not hide the dialog when failed', function () {
                spyOn(mdDialogMock, 'hide');
                controller.save();

                updateDeferred.reject();
                rootScope.$digest();

                expect(mdDialogMock.hide).not.toHaveBeenCalled();
            });

            it('should send back the updated hotSpotBucket after save succeeded', function () {
                controller.hotSpotBucket.name = 'updated';

                spyOn(mdDialogMock, 'hide');
                controller.save();

                updateDeferred.resolve();
                rootScope.$digest();

                expect(mdDialogMock.hide).toHaveBeenCalledWith(controller.hotSpotBucket);
            });

            it('should set saving flag to false when succeeded', function () {
                controller.save();

                updateDeferred.resolve();
                rootScope.$digest();

                expect(controller.saving).toBe(false);
            });

            it('should set saving flag to false when failed', function () {
                controller.save();

                updateDeferred.reject();
                rootScope.$digest();

                expect(controller.saving).toBe(false);
            });
        });

    });
})();