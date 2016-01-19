(function () {
    'use strict';

    describe('CreateOutcome controller', function(){

        var ParseServiceMock,
            AuthServiceMock,
            mdDialogMock,
            mdDialogDeferred,
            initDeferred,
            controller,
            rootScope,
            q;

        beforeEach(module('xr.hotSpots'));
        beforeEach(module(function ($provide) {
            ParseServiceMock = {
                getAllObjects: function () {},
                updateObject: function () {},
                postObject: function () {}
            };

            AuthServiceMock = {
                getUserToken: function () {
                    return '1234';
                },
                getCurrentUser: function () {
                    return {
                        objectId: '123'
                    }
                }
            };

            mdDialogMock = {
                show: function () {}
            };

            $provide.value('ParseService', ParseServiceMock);
            $provide.value('AuthService', AuthServiceMock);
            $provide.value('$mdDialog', mdDialogMock);
        }));
        beforeEach(inject(function($controller, $q, $rootScope) {
            q = $q;
            rootScope = $rootScope;

            initDeferred = q.defer();
            spyOn(ParseServiceMock, 'getAllObjects').and.returnValue(initDeferred.promise);

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

                expect(ParseServiceMock.getAllObjects).toHaveBeenCalledWith('HotSpotBucket', AuthServiceMock.getUserToken());
                expect(controller.hotSpotBuckets).toBe(hotSpotBuckets);
            });
        });

        describe('handleHotSpotAdd', function () {
            it('should update the hot spot bucket with the new hotSpots', function () {
                spyOn(ParseServiceMock, 'updateObject');
                var hotSpotBucket = {
                    objectId: 'abc',
                    hotSpots: [
                        'hot', 'spots', 'are', 'cool!'
                    ]
                };

                controller.handleHotSpotAdd(hotSpotBucket);

                var expecteUpdateObj = {
                    hotSpots: hotSpotBucket.hotSpots
                };
                expect(ParseServiceMock.updateObject).toHaveBeenCalledWith('HotSpotBucket', hotSpotBucket.objectId, expecteUpdateObj, AuthServiceMock.getUserToken());
            });
        });

        describe('handleHotSpotDelete', function () {
            it('should update the hot spot bucket with the new hotSpots', function () {
                spyOn(ParseServiceMock, 'updateObject');
                var hotSpotBucket = {
                    objectId: 'abc',
                    hotSpots: [
                        'are', 'cool!'
                    ]
                };

                controller.handleHotSpotDelete(hotSpotBucket);

                var expecteUpdateObj = {
                    hotSpots: hotSpotBucket.hotSpots
                };
                expect(ParseServiceMock.updateObject).toHaveBeenCalledWith('HotSpotBucket', hotSpotBucket.objectId, expecteUpdateObj, AuthServiceMock.getUserToken());
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
                spyOn(ParseServiceMock, 'postObject').and.returnValue(postHotSpotBucketDeferred.promise);
                spyOn(controller.hotSpotBucketForm, '$setPristine');
            });

            it('should not try to post if form is invalid', function () {
                controller.hotSpotBucketForm.$valid = false;

                controller.saveHotSpotBucket();

                expect(ParseServiceMock.postObject).not.toHaveBeenCalled();
            });

            it('should try to post if form is valid', function () {
                controller.hotSpotBucketForm.$valid = true;

                controller.saveHotSpotBucket();

                expect(ParseServiceMock.postObject).toHaveBeenCalled();
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

                expect(ParseServiceMock.getAllObjects.calls.count()).toBe(2);
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

            it('should update the outcome if the edit is finished', function () {
                var hotSpotBucket = {
                    name: 'NotEdited',
                    hotSpots: []
                };
                controller.editHotSpotBucket(hotSpotBucket);
                mdDialogDeferred.resolve({
                    name: 'Edited'
                });
                rootScope.$digest();

                expect(hotSpotBucket.name).toBe('Edited');
            });
        });

    });
})();