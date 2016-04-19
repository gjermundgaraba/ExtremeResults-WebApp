import { module, inject } from "angular-mocks";

import "../../../app/hotSpots/hotSpots.module";

(function () {
    'use strict';

    describe('Edit Hot Spot Bucket Controller', function(){

        var q,
            rootScope,
            mdDialogMock,
            HotSpotsServiceMock,
            controller;

        beforeEach(module('xr.hotSpots'));
        beforeEach(module(function ($provide) {
            var confirmObj = {
                title: function () { return this },
                ok: function() { return this},
                cancel: function() { return this }
            };

            mdDialogMock = {
                show: function () {},
                hide: function () {},
                confirm: function () {
                    return confirmObj;
                }
            };

            HotSpotsServiceMock = {
                editHotSpotBucket: function () {},
                deleteHotSpotBucket: function () {}
            };

            $provide.value('$mdDialog', mdDialogMock);
            $provide.value('HotSpotsService', HotSpotsServiceMock);
        }));
        beforeEach(inject(function($controller, $q, $rootScope) {
            q = $q;
            rootScope = $rootScope;

            controller = $controller('EditHotSpotBucketController');
            controller.renameCallback = function () {};
            controller.deleteCallback = function () {};
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
                spyOn(HotSpotsServiceMock, 'editHotSpotBucket').and.returnValue(updateDeferred.promise);
            });

            it('should set saving flag when saving', function () {
                controller.save();

                expect(controller.saving).toBe(true);
            });

            it('should not call update when already saving', function () {
                controller.save();
                controller.save();
                controller.save();

                expect(HotSpotsServiceMock.editHotSpotBucket.calls.count()).toBe(1); // 1 because it will be called the first time
            });

            it('should update the hotSpotBukcet', function () {
                controller.save();

                expect(HotSpotsServiceMock.editHotSpotBucket).toHaveBeenCalledWith(hotSpotBucket.objectId, {name: hotSpotBucket.name});
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

            it('should call callback after save succeeded', function () {
                controller.hotSpotBucket.name = 'updated';

                spyOn(mdDialogMock, 'hide');
                spyOn(controller, 'renameCallback');
                controller.save();

                updateDeferred.resolve();
                rootScope.$digest();

                expect(controller.renameCallback).toHaveBeenCalledWith(controller.hotSpotBucket);
                expect(mdDialogMock.hide).toHaveBeenCalledWith();
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

        describe('delete', function () {
            var deleteDeferred,
                showConfirmDialogDeferred,
                hotSpotBucket;

            beforeEach(function () {
                hotSpotBucket = {
                    objectId: 'objid',
                    name: 'test',
                    hotSpots: []
                };

                controller.hotSpotBucket = hotSpotBucket;

                deleteDeferred = q.defer();
                showConfirmDialogDeferred = q.defer();

                spyOn(HotSpotsServiceMock, 'deleteHotSpotBucket').and.returnValue(deleteDeferred.promise);
                spyOn(mdDialogMock, 'show').and.returnValue(showConfirmDialogDeferred.promise);
            });

            it('should not delete if already saving', function () {
                controller.saving = true;
                controller.deleteHotSpotBucket();

                expect(mdDialogMock.show).not.toHaveBeenCalled();
                expect(HotSpotsServiceMock.deleteHotSpotBucket).not.toHaveBeenCalled();
            });

            it('should set saving to true while deleting', function () {
                controller.deleteHotSpotBucket();

                showConfirmDialogDeferred.resolve();
                rootScope.$digest();

                expect(controller.saving).toBe(true);
            });

            it('should not delete the hot spot bucket if not confirmed by the user', function () {
                controller.deleteHotSpotBucket();

                expect(HotSpotsServiceMock.deleteHotSpotBucket).not.toHaveBeenCalled();
            });

            it('should not delete the hot spot bucket if declined by the user', function () {
                controller.deleteHotSpotBucket();

                showConfirmDialogDeferred.reject();
                rootScope.$digest();

                expect(HotSpotsServiceMock.deleteHotSpotBucket).not.toHaveBeenCalled();
            });

            it('should delete the hotSpotBucket if confirmed', function () {
                controller.deleteHotSpotBucket();

                showConfirmDialogDeferred.resolve();
                rootScope.$digest();

                expect(HotSpotsServiceMock.deleteHotSpotBucket).toHaveBeenCalledWith(hotSpotBucket.objectId);
            });

            it('should call the delete callback after deletion of the hot spot bucket', function () {
                spyOn(controller, 'deleteCallback');
                controller.deleteHotSpotBucket();

                showConfirmDialogDeferred.resolve();
                rootScope.$digest();
                deleteDeferred.resolve();
                rootScope.$digest();

                expect(controller.deleteCallback).toHaveBeenCalled();
            });

            it('should set saving to false after deletion of hot spot bucket', function () {
                controller.deleteHotSpotBucket();

                showConfirmDialogDeferred.resolve();
                rootScope.$digest();
                deleteDeferred.resolve();
                rootScope.$digest();

                expect(controller.saving).toBe(false);
            });

            it('should set saving to false after unsuccessful deletion of hot spot bucket', function () {
                controller.deleteHotSpotBucket();

                showConfirmDialogDeferred.resolve();
                rootScope.$digest();
                deleteDeferred.reject();
                rootScope.$digest();

                expect(controller.saving).toBe(false);
            });
        });

    });
})();