(function () {
    'use strict';

    describe('Outcome Entry Controller', function(){

        var XrUtilsMock,
            q,
            rootScope,
            mdDialogDeferred,
            mdDialogMock,
            headerMock,
            formattedDateMock,
            controller;

        beforeEach(module('xr.overview'));
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
                showObj.locals.outcome.firstStory = 'Edited';
                return mdDialogDeferred.promise;
            };

            controller = $controller('OutcomeEntryController');
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
                controller.editOutcome();

                expect(controller.outcomeObj.firstStory).toBe('NotEdited');
            });

            it('should not change the outcome if the edit is canceled', function () {
                controller.outcomeObj = {
                    firstStory: 'NotEdited'
                };
                controller.editOutcome();
                mdDialogDeferred.reject();

                expect(controller.outcomeObj.firstStory).toBe('NotEdited');
            });

            it('should update the outcome if the edit is finished', function () {
                controller.outcomeObj = {
                    firstStory: 'NotEdited'
                };
                controller.editOutcome();
                mdDialogDeferred.resolve({
                    firstStory: 'Edited'
                });
                rootScope.$digest();

                expect(controller.outcomeObj.firstStory).toBe('Edited');
            });
        });

    });
})();