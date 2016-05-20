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

            mdDialogMock = {
                hide: function () {}
            };

            EditReflectionEntryServiceMock = {
                editReflection: function () {}
            };

            $provide.value('XrUtils', XrUtilsMock);
            $provide.value('$mdDialog', mdDialogMock);
            $provide.value('EditReflectionEntryService', EditReflectionEntryServiceMock);
        }));
        beforeEach(inject(function($controller, $q, $rootScope) {
            q = $q;
            rootScope = $rootScope;

            controller = $controller('EditReflectionEntryController');
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

                spyOn(mdDialogMock, 'hide');
                controller.save();

                updateDeferred.resolve();
                rootScope.$digest();

                expect(mdDialogMock.hide).toHaveBeenCalledWith(controller.reflection);
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