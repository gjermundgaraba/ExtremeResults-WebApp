(function () {
    'use strict';

    describe('CreateOutcome controller', function(){

        var HotSpotsServiceMock,
            mdDialogMock,
            mdDialogDeferred,
            initDeferred,
            controller,
            rootScope,
            q;

        beforeEach(module('xr.hotSpots'));
        beforeEach(module(function ($provide) {
            HotSpotsServiceMock = {
                getHotSpotBuckets: function () {},
                createHotSpotBucket: function () {},
                editHotSpotBucket: function () {}
            };

            mdDialogMock = {
                show: function () {}
            };

            $provide.value('HotSpotsService', HotSpotsServiceMock);
            $provide.value('$mdDialog', mdDialogMock);
        }));
        beforeEach(inject(function($controller, $q, $rootScope) {
            q = $q;
            rootScope = $rootScope;

            initDeferred = q.defer();
            spyOn(HotSpotsServiceMock, 'getHotSpotBuckets').and.returnValue(initDeferred.promise);

            mdDialogDeferred = q.defer();
            mdDialogMock.show = function (showObj) {
                showObj.locals.hotSpotBucket.name = 'Edited';
                return mdDialogDeferred.promise;
            };

            controller = $controller('HotSpotsController', {'$location': location});
        }));

        describe('init', function () {
            it('should get hot spot buckets', function () {
                var hotSpotBuckets = [{test: 1}];

                initDeferred.resolve(hotSpotBuckets);
                rootScope.$digest();

                expect(HotSpotsServiceMock.getHotSpotBuckets).toHaveBeenCalled();
                expect(controller.hotSpotBuckets).toBe(hotSpotBuckets);
            });
        });

        describe('handleHotSpotAdd', function () {
            it('should update the hot spot bucket with the new hotSpots', function () {
                spyOn(HotSpotsServiceMock, 'editHotSpotBucket');
                var hotSpotBucket = {
                    objectId: 'abc',
                    name: 'hotSpotName',
                    hotSpots: [
                        'hot', 'spots', 'are', 'cool!'
                    ]
                };

                controller.handleHotSpotAdd(hotSpotBucket);

                var expectedUpdateObj = {
                    name: hotSpotBucket.name,
                    hotSpots: hotSpotBucket.hotSpots
                };
                expect(HotSpotsServiceMock.editHotSpotBucket).toHaveBeenCalledWith(hotSpotBucket.objectId, expectedUpdateObj);
            });
        });

        describe('handleHotSpotDelete', function () {
            it('should update the hot spot bucket with the new hotSpots', function () {
                spyOn(HotSpotsServiceMock, 'editHotSpotBucket');
                var hotSpotBucket = {
                    objectId: 'abc',
                    name: 'hotSpotName',
                    hotSpots: [
                        'are', 'cool!'
                    ]
                };

                controller.handleHotSpotDelete(hotSpotBucket);

                var expectedUpdateObj = {
                    name: hotSpotBucket.name,
                    hotSpots: hotSpotBucket.hotSpots
                };
                expect(HotSpotsServiceMock.editHotSpotBucket).toHaveBeenCalledWith(hotSpotBucket.objectId, expectedUpdateObj);
            });
        });

        describe('saveHotSpotBucket', function () {
            var postHotSpotBucketDeferred;

            beforeEach(function () {
                controller.hotSpotBucketForm = {
                    $valid: false,
                    $setPristine: function () {}
                };
                postHotSpotBucketDeferred = q.defer();
                spyOn(HotSpotsServiceMock, 'createHotSpotBucket').and.returnValue(postHotSpotBucketDeferred.promise);
                spyOn(controller.hotSpotBucketForm, '$setPristine');
            });

            it('should not try to post if form is invalid', function () {
                controller.hotSpotBucketForm.$valid = false;

                controller.saveHotSpotBucket();

                expect(HotSpotsServiceMock.createHotSpotBucket).not.toHaveBeenCalled();
            });

            it('should try to post if form is valid', function () {
                controller.hotSpotBucketForm.$valid = true;

                controller.saveHotSpotBucket();

                expect(HotSpotsServiceMock.createHotSpotBucket).toHaveBeenCalled();
            });

            it('should reset field after save', function () {
                controller.hotSpotBucketName = 'test';
                controller.hotSpotBucketForm.$valid = true;

                controller.saveHotSpotBucket();
                postHotSpotBucketDeferred.resolve();
                rootScope.$digest();

                expect(controller.hotSpotBucketName).toBe('');
                expect(controller.hotSpotBucketForm.$setPristine).toHaveBeenCalled();
            });

            it('should get all hot spot buckets after save', function () {
                controller.hotSpotBucketName = 'test';
                controller.hotSpotBucketForm.$valid = true;

                controller.saveHotSpotBucket();
                postHotSpotBucketDeferred.resolve();
                rootScope.$digest();

                expect(HotSpotsServiceMock.getHotSpotBuckets.calls.count()).toBe(2);
            });
        });

        describe('edit hotSpotBucket', function () {
            it('should not send in the original object to the dialog', function () {
                // I need that the mdDialogMock will change the outcome sent in, make sure of this
                var hotSpotBucket = {
                    name: 'NotEdited',
                    hotSpots: []
                };
                controller.editHotSpotBucket(hotSpotBucket);

                expect(hotSpotBucket.name).toBe('NotEdited');
            });

            it('should not change the outcome if the edit is canceled', function () {
                var hotSpotBucket = {
                    name: 'NotEdited',
                    hotSpots: []
                };
                controller.editHotSpotBucket(hotSpotBucket);
                mdDialogDeferred.reject();

                expect(hotSpotBucket.name).toBe('NotEdited');
            });

            it('should update the outcome if the edit is finished and renameCallBack gets called', function () {
                var editedName = 'Edited';
                var hotSpotBucket = {
                    name: 'NotEdited',
                    hotSpots: []
                };
                spyOn(mdDialogMock, 'show').and.callFake(function (showObj) {
                    showObj.locals.renameCallback({
                        name: editedName
                    });
                });
                controller.editHotSpotBucket(hotSpotBucket);

                expect(hotSpotBucket.name).toBe(editedName);
            });

            it('should refresh all buckets if hotSpotBucket is deleted', function () {
                var hotSpotBucket = {
                    name: 'NotEdited',
                    hotSpots: []
                };
                spyOn(mdDialogMock, 'show').and.callFake(function (showObj) {
                    showObj.locals.deleteCallback();
                });

                controller.editHotSpotBucket(hotSpotBucket);

                expect(HotSpotsServiceMock.getHotSpotBuckets.calls.count()).toBe(2);
            });
        });

    });
})();