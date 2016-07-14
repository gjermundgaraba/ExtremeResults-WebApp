import { module, inject } from "angular-mocks";

import "../../../app/entry/entry.module";

(function () {
    'use strict';

    describe('Outcome Entry Controller', function(){

        var XrUtilsMock,
            q,
            rootScope,
            mdDialogMock,
            headerMock,
            formattedDateMock,
            deleteDelegate,
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

            deleteDelegate = {
                delete: function () {}
            };

            $provide.value('XrUtils', XrUtilsMock);
            $provide.value('$mdDialog', mdDialogMock);
        }));
        beforeEach(inject(function($controller, $q, $rootScope) {
            q = $q;
            rootScope = $rootScope;

            controller = $controller('OutcomeEntryController');
            controller.deleteDelegate = deleteDelegate;
        }));

        describe('init', function () {

            it('should get and set header', function() {
                expect(controller.header).toBe(headerMock);
            });

            it('should get and set outcome time', function () {
                expect(controller.outcomeTime).toBe(formattedDateMock);
            });
        });

        describe('edit outcome', function () {
            it('should not send in the original object to the dialog', function () {
                // I need that the mdDialogMock will change the outcome sent in, make sure of this
                controller.outcomeObj = {
                    firstStory: 'NotEdited'
                };

                expect(controller.outcomeObj.firstStory).toBe('NotEdited');
            });

            it('should not change the outcome if the edit is canceled', function () {
                controller.outcomeObj = {
                    firstStory: 'NotEdited'
                };
                controller.editOutcome();

                expect(controller.outcomeObj.firstStory).toBe('NotEdited');
            });

            it('should update the outcome if the edit is finished', function () {
                mdDialogMock.show = function (showObj) {
                    var updatedOutcome = showObj.locals.outcome;
                    updatedOutcome.firstStory = 'Edited';
                    showObj.locals.editCallback(updatedOutcome);
                };

                controller.outcomeObj = {
                    firstStory: 'NotEdited'
                };
                controller.editOutcome();

                expect(controller.outcomeObj.firstStory).toBe('Edited');
            });

            it('should delete the outcome when deleteCallback is called', function () {
                spyOn(deleteDelegate, 'delete');

                mdDialogMock.show = function (showObj) {
                    showObj.locals.deleteCallback();
                };

                controller.editOutcome();

                expect(deleteDelegate.delete).toHaveBeenCalledWith(controller.outcomeObj);

            });
        });

    });
})();