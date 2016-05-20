import { module, inject } from "angular-mocks";

import "../../../app/entry/entry.module";

(function () {
    'use strict';

    describe('Reflection Entry Controller', function(){

        var XrUtilsMock,
            q,
            rootScope,
            mdDialogDeferred,
            mdDialogMock,
            headerMock,
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

            mdDialogMock = {
                show: function () {}
            };

            $provide.value('XrUtils', XrUtilsMock);
            $provide.value('$mdDialog', mdDialogMock);
        }));
        beforeEach(inject(function($controller, $q, $rootScope) {
            q = $q;
            rootScope = $rootScope;

            mdDialogDeferred = q.defer();
            mdDialogMock.show = function (showObj) {
                showObj.locals.reflection.firstThingThatWentWell = 'Edited';
                return mdDialogDeferred.promise;
            };

            controller = $controller('ReflectionEntryController', {$scope: $rootScope});
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
                mdDialogDeferred.reject();

                expect(controller.reflectionObj.firstThingThatWentWell).toBe('NotEdited');
            });

            it('should update the outcome if the edit is finished', function () {
                controller.reflectionObj = {
                    firstThingThatWentWell: 'NotEdited'
                };
                controller.editReflection();
                mdDialogDeferred.resolve({
                    firstThingThatWentWell: 'Edited'
                });
                rootScope.$digest();

                expect(controller.reflectionObj.firstThingThatWentWell).toBe('Edited');
            });
        });
    });
})();