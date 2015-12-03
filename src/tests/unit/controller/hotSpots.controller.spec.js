(function () {
    'use strict';

    describe('CreateOutcome controller', function(){

        var ParseServiceMock,
            AuthServiceMock,
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


            $provide.value('ParseService', ParseServiceMock);
            $provide.value('AuthService', AuthServiceMock);
        }));
        beforeEach(inject(function($controller, $q, $rootScope) {
            q = $q;
            rootScope = $rootScope;

            initDeferred = q.defer();
            spyOn(ParseServiceMock, 'getAllObjects').and.returnValue(initDeferred.promise);

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
                    $valid: false
                };
                postHotSpotBucketDeferred = q.defer();
                spyOn(ParseServiceMock, 'postObject').and.returnValue(postHotSpotBucketDeferred.promise);
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
        });

    });
})();