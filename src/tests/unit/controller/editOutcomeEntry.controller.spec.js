(function () {
    'use strict';

    describe('Edit Outcome Entry Controller', function(){

        var XrUtilsMock,
            q,
            rootScope,
            mdDialogMock,
            headerMock,
            formattedDateMock,
            ParseServiceMock,
            AuthServiceMock,
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
                hide: function () {}
            };

            ParseServiceMock = {
                updateObject: function () {}
            };

            AuthServiceMock = {
                getUserToken: function () {}
            };

            $provide.value('XrUtils', XrUtilsMock);
            $provide.value('$mdDialog', mdDialogMock);
            $provide.value('ParseService', ParseServiceMock);
            $provide.value('AuthService', AuthServiceMock);
        }));
        beforeEach(inject(function($controller, $q, $rootScope) {
            q = $q;
            rootScope = $rootScope;

            controller = $controller('EditOutcomeEntryController');
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
            var outcome,
                updateDeferred;

            beforeEach(function () {
                outcome = {
                    className: 'class',
                    objectId: '1234',
                    firstStory: 'old',
                    secondStory: 'old2',
                    thirdStory: 'old3'
                };

                controller.outcome = outcome;

                controller.editOutcomeForm = {
                    $valid: true,
                    $setPristine: function () {}
                };

                updateDeferred = q.defer();
                spyOn(ParseServiceMock, 'updateObject').and.returnValue(updateDeferred.promise);
            });

            it('should not save anything when form is invalid', function () {
                controller.editOutcomeForm.$valid = false;

                controller.save();

                expect(controller.saving).toBe(false);
                expect(ParseServiceMock.updateObject).not.toHaveBeenCalled();
            });

            it('should set saving flag when saving', function () {
                controller.save();

                expect(controller.saving).toBe(true);
            });

            it('should not call update when already saving', function () {
                controller.save();
                controller.save();
                controller.save();

                expect(ParseServiceMock.updateObject.calls.count()).toBe(1); // 1 because it will be called the first time
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

            it('should send back the updated outcome after save succeeded', function () {
                controller.outcome.firstStory = 'updated1';
                controller.outcome.secondStory = 'updated2';
                controller.outcome.thirdStory = 'updated3';

                spyOn(mdDialogMock, 'hide');
                controller.save();

                updateDeferred.resolve();
                rootScope.$digest();

                expect(mdDialogMock.hide).toHaveBeenCalledWith(controller.outcome);
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