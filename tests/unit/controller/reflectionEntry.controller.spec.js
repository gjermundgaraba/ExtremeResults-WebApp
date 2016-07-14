import { module, inject } from "angular-mocks";

import "../../../app/entry/entry.module";

(function () {
    'use strict';

    describe('Reflection Entry Controller', function(){

        var XrUtilsMock,
            q,
            rootScope,
            mdDialogMock,
            headerMock,
            deleteDelegate,
            formattedDateMock,
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

            deleteDelegate = {
                delete: function () {}
            };

            mdDialogMock = {
                show: function () {}
            };

            $provide.value('XrUtils', XrUtilsMock);
            $provide.value('$mdDialog', mdDialogMock);
        }));
        beforeEach(inject(function($controller, $q, $rootScope) {
            q = $q;
            rootScope = $rootScope;

            controller = $controller('ReflectionEntryController', {$scope: $rootScope});
            controller.deleteDelegate = deleteDelegate;
        }));

        describe('init', function () {

            it('should get and set header', function() {
                expect(controller.header).toBe(headerMock);
            });

            it('should get and set outcome time', function () {
                expect(controller.reflectionTime).toBe(formattedDateMock);
            });
        });

        describe('edit reflection', function () {
            it('should not send in the original object to the dialog', function () {
                // I need that the mdDialogMock will change the outcome sent in, make sure of this
                controller.reflectionObj = {
                    firstThingThatWentWell: 'NotEdited'
                };
                controller.editReflection();

                expect(controller.reflectionObj.firstThingThatWentWell).toBe('NotEdited');
            });

            it('should not change the outcome if the edit is canceled', function () {
                controller.reflectionObj = {
                    firstThingThatWentWell: 'NotEdited'
                };
                controller.editReflection();

                expect(controller.reflectionObj.firstThingThatWentWell).toBe('NotEdited');
            });

            it('should update the outcome if the edit is finished', function () {
                mdDialogMock.show = function (showObj) {
                    var updatedReflection = showObj.locals.reflection;
                    updatedReflection.firstThingThatWentWell = 'Edited';
                    showObj.locals.updateCallback(updatedReflection);
                };

                controller.reflectionObj = {
                    firstThingThatWentWell: 'NotEdited'
                };
                controller.editReflection();

                expect(controller.reflectionObj.firstThingThatWentWell).toBe('Edited');
            });

            it('should delete the reflection when deleteCallback is called', function () {
                spyOn(deleteDelegate, 'delete');

                mdDialogMock.show = function (showObj) {
                    showObj.locals.deleteCallback();
                };

                controller.editReflection();

                expect(deleteDelegate.delete).toHaveBeenCalledWith(controller.reflectionObj);
            });
        });
    });
})();