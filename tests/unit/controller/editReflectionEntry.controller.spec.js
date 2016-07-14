import { module, inject } from "angular-mocks";

import "../../../app/entry/entry.module";

(function () {
    'use strict';

    describe('Edit Reflection Entry Controller', function(){

        var XrUtilsMock,
            q,
            rootScope,
            mdDialogMock,
            headerMock,
            formattedDateMock,
            confirmMock,
            EditReflectionEntryServiceMock,
            controller;

        beforeEach(module('xr.entry'));
        beforeEach(module(function ($provide) {
            headerMock = 'HEADERMOCKYMOCK';
            formattedDateMock = 'Some formatted date';

            XrUtilsMock = {
                getEntryHeader: function () {
                    return headerMock;
                },
                getFormattedEntryDate: function () {
                    return formattedDateMock;
                }
            };

            confirmMock = {
                title: function () {
                    return confirmMock;
                },
                ok: function () {
                    return confirmMock;
                },
                cancel: function () {
                    return confirmMock;
                }
            };

            mdDialogMock = {
                hide: function () {},
                show: function () {},
                confirm: function () {
                    return confirmMock;
                }
            };

            EditReflectionEntryServiceMock = {
                editReflection: function () {},
                deleteReflection: function () {}
            };

            $provide.value('XrUtils', XrUtilsMock);
            $provide.value('$mdDialog', mdDialogMock);
            $provide.value('EditReflectionEntryService', EditReflectionEntryServiceMock);
        }));
        beforeEach(inject(function($controller, $q, $rootScope) {
            q = $q;
            rootScope = $rootScope;

            controller = $controller('EditReflectionEntryController');
            controller.editCallback = function () {};
            controller.deleteCallback = function () {};
        }));

        describe('init', function () {

            it('should set up header', function() {
                expect(controller.header).toBe(headerMock + ' for ' + formattedDateMock);
            });

            it('should set saving to false', function () {
                expect(controller.saving).toBe(false);
            });
        });

        describe('save', function () {
            var reflection,
                updateDeferred;

            beforeEach(function () {
                reflection = {
                    className: 'class',
                    objectId: '1234',
                    firstStory: 'old',
                    secondStory: 'old2',
                    thirdStory: 'old3'
                };

                controller.reflection = reflection;

                controller.editReflectionForm = {
                    $valid: true,
                    $setPristine: function () {}
                };

                updateDeferred = q.defer();
                spyOn(EditReflectionEntryServiceMock, 'editReflection').and.returnValue(updateDeferred.promise);
            });

            it('should not save anything when form is invalid', function () {
                controller.editReflectionForm.$valid = false;

                controller.save();

                expect(controller.saving).toBe(false);
                expect(EditReflectionEntryServiceMock.editReflection).not.toHaveBeenCalled();
            });

            it('should set saving flag when saving', function () {
                controller.save();

                expect(controller.saving).toBe(true);
            });

            it('should not call update when already saving', function () {
                controller.save();
                controller.save();
                controller.save();

                expect(EditReflectionEntryServiceMock.editReflection.calls.count()).toBe(1); // 1 because it will be called the first time
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

            it('should send back the updated reflection after save succeeded', function () {
                controller.reflection.firstStory = 'updated1';
                controller.reflection.secondStory = 'updated2';
                controller.reflection.thirdStory = 'updated3';

                spyOn(controller, 'editCallback');
                controller.save();

                updateDeferred.resolve();
                rootScope.$digest();

                expect(controller.editCallback).toHaveBeenCalledWith(controller.reflection);
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

        describe('deleteReflection', function () {
            it('should not show the dialog if saving', function () {
                spyOn(mdDialogMock, 'show');
                controller.saving = true;

                controller.deleteReflection();

                expect(mdDialogMock.show).not.toHaveBeenCalled();
            });

            it('should show the confirm dialog', function () {
                spyOn(mdDialogMock, 'show').and.returnValue(q.defer().promise);

                controller.deleteReflection();

                expect(mdDialogMock.show).toHaveBeenCalledWith(confirmMock);
            });

            it('should set saving to true if confirmed', function () {
                controller.reflection = {};
                var deferred = q.defer();
                spyOn(mdDialogMock, 'show').and.returnValue(deferred.promise);
                spyOn(EditReflectionEntryServiceMock, 'deleteReflection').and.returnValue(q.defer().promise);

                controller.deleteReflection();

                deferred.resolve();
                rootScope.$digest();

                expect(controller.saving).toBe(true);
            });

            it('should call deleteReflection if confirmed', function () {
                controller.reflection = {};
                var deferred = q.defer();
                spyOn(mdDialogMock, 'show').and.returnValue(deferred.promise);
                spyOn(EditReflectionEntryServiceMock, 'deleteReflection').and.returnValue(q.defer().promise);
                spyOn(controller, 'deleteCallback');

                controller.deleteReflection();

                deferred.resolve();
                rootScope.$digest();

                expect(EditReflectionEntryServiceMock.deleteReflection).toHaveBeenCalled();
            });

            it('should not call deleteReflection if not confirmed', function () {
                controller.reflection = {};
                var deferred = q.defer();
                spyOn(mdDialogMock, 'show').and.returnValue(deferred.promise);
                spyOn(EditReflectionEntryServiceMock, 'deleteReflection').and.returnValue(q.defer().promise);
                spyOn(controller, 'deleteCallback');

                controller.deleteReflection();

                deferred.reject();
                rootScope.$digest();

                expect(EditReflectionEntryServiceMock.deleteReflection).not.toHaveBeenCalled();
            });

            it('should call deleteCallback if deletion is successful', function () {
                controller.reflection = {};
                var deferred = q.defer();
                var deleteDeferred = q.defer();
                spyOn(mdDialogMock, 'show').and.returnValue(deferred.promise);
                spyOn(EditReflectionEntryServiceMock, 'deleteReflection').and.returnValue(deleteDeferred.promise);
                spyOn(controller, 'deleteCallback');

                controller.deleteReflection();

                deferred.resolve();
                rootScope.$digest();

                deleteDeferred.resolve();
                rootScope.$digest();

                expect(controller.deleteCallback).toHaveBeenCalled();
            });

            it('should not call deleteCallback if deletion is not successful', function () {
                controller.reflection = {};
                var deferred = q.defer();
                var deleteDeferred = q.defer();
                spyOn(mdDialogMock, 'show').and.returnValue(deferred.promise);
                spyOn(EditReflectionEntryServiceMock, 'deleteReflection').and.returnValue(deleteDeferred.promise);
                spyOn(controller, 'deleteCallback');

                controller.deleteReflection();

                deferred.resolve();
                rootScope.$digest();

                deleteDeferred.reject();
                rootScope.$digest();

                expect(controller.deleteCallback).not.toHaveBeenCalled();
            });

            it('should set saving to false if deletion is successful', function () {
                controller.reflection = {};
                var deferred = q.defer();
                var deleteDeferred = q.defer();
                spyOn(mdDialogMock, 'show').and.returnValue(deferred.promise);
                spyOn(EditReflectionEntryServiceMock, 'deleteReflection').and.returnValue(deleteDeferred.promise);
                spyOn(controller, 'deleteCallback');

                controller.deleteReflection();

                deferred.resolve();
                rootScope.$digest();

                deleteDeferred.resolve();
                rootScope.$digest();

                expect(controller.saving).toBe(false);
            });

            it('should set saving to false if deletion is not successful', function () {
                controller.reflection = {};
                var deferred = q.defer();
                var deleteDeferred = q.defer();
                spyOn(mdDialogMock, 'show').and.returnValue(deferred.promise);
                spyOn(EditReflectionEntryServiceMock, 'deleteReflection').and.returnValue(deleteDeferred.promise);
                spyOn(controller, 'deleteCallback');

                controller.deleteReflection();

                deferred.resolve();
                rootScope.$digest();

                deleteDeferred.reject();
                rootScope.$digest();

                expect(controller.saving).toBe(false);
            });
        });


    });
})();