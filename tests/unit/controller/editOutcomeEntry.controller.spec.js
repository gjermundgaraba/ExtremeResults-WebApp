import { module, inject } from "angular-mocks";

import "../../../app/entry/entry.module";

(function () {
    'use strict';

    describe('Edit Outcome Entry Controller', function(){

        var XrUtilsMock,
            q,
            rootScope,
            mdDialogMock,
            headerMock,
            formattedDateMock,
            EditOutcomeEntryServiceMock,
            confirmMock,
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

            EditOutcomeEntryServiceMock = {
                editOutcome: function () {},
                deleteOutcome: function () {}
            };


            $provide.value('XrUtils', XrUtilsMock);
            $provide.value('$mdDialog', mdDialogMock);
            $provide.value('EditOutcomeEntryService', EditOutcomeEntryServiceMock);
        }));
        beforeEach(inject(function($controller, $q, $rootScope) {
            q = $q;
            rootScope = $rootScope;

            controller = $controller('EditOutcomeEntryController');
            controller.editCallback = function () {}
            controller.deleteCallback = function () {}
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
                spyOn(EditOutcomeEntryServiceMock, 'editOutcome').and.returnValue(updateDeferred.promise);
            });

            it('should not save anything when form is invalid', function () {
                controller.editOutcomeForm.$valid = false;

                controller.save();

                expect(controller.saving).toBe(false);
                expect(EditOutcomeEntryServiceMock.editOutcome).not.toHaveBeenCalled();
            });

            it('should set saving flag when saving', function () {
                controller.save();

                expect(controller.saving).toBe(true);
            });

            it('should not call update when already saving', function () {
                controller.save();
                controller.save();
                controller.save();

                expect(EditOutcomeEntryServiceMock.editOutcome.calls.count()).toBe(1); // 1 because it will be called the first time
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

                spyOn(controller, 'editCallback');
                controller.save();

                updateDeferred.resolve();
                rootScope.$digest();

                expect(controller.editCallback).toHaveBeenCalledWith(controller.outcome);
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

        describe('deleteOutcome', function () {
            it('should not show the dialog if saving', function () {
                spyOn(mdDialogMock, 'show');
                controller.saving = true;

                controller.deleteOutcome();

                expect(mdDialogMock.show).not.toHaveBeenCalled();
            });

            it('should show the confirm dialog', function () {
                spyOn(mdDialogMock, 'show').and.returnValue(q.defer().promise);

                controller.deleteOutcome();

                expect(mdDialogMock.show).toHaveBeenCalledWith(confirmMock);
            });

            it('should set saving to true if confirmed', function () {
                controller.outcome = {};
                var deferred = q.defer();
                spyOn(mdDialogMock, 'show').and.returnValue(deferred.promise);
                spyOn(EditOutcomeEntryServiceMock, 'deleteOutcome').and.returnValue(q.defer().promise);

                controller.deleteOutcome();

                deferred.resolve();
                rootScope.$digest();

                expect(controller.saving).toBe(true);
            });

            it('should call deleteOutcome if confirmed', function () {
                controller.outcome = {};
                var deferred = q.defer();
                spyOn(mdDialogMock, 'show').and.returnValue(deferred.promise);
                spyOn(EditOutcomeEntryServiceMock, 'deleteOutcome').and.returnValue(q.defer().promise);
                spyOn(controller, 'deleteCallback');

                controller.deleteOutcome();

                deferred.resolve();
                rootScope.$digest();

                expect(EditOutcomeEntryServiceMock.deleteOutcome).toHaveBeenCalled();
            });

            it('should not call deleteOutcome if not confirmed', function () {
                controller.outcome = {};
                var deferred = q.defer();
                spyOn(mdDialogMock, 'show').and.returnValue(deferred.promise);
                spyOn(EditOutcomeEntryServiceMock, 'deleteOutcome').and.returnValue(q.defer().promise);
                spyOn(controller, 'deleteCallback');

                controller.deleteOutcome();

                deferred.reject();
                rootScope.$digest();

                expect(EditOutcomeEntryServiceMock.deleteOutcome).not.toHaveBeenCalled();
            });

            it('should call deleteCallback if deletion is successful', function () {
                controller.outcome = {};
                var deferred = q.defer();
                var deleteDeferred = q.defer();
                spyOn(mdDialogMock, 'show').and.returnValue(deferred.promise);
                spyOn(EditOutcomeEntryServiceMock, 'deleteOutcome').and.returnValue(deleteDeferred.promise);
                spyOn(controller, 'deleteCallback');

                controller.deleteOutcome();

                deferred.resolve();
                rootScope.$digest();

                deleteDeferred.resolve();
                rootScope.$digest();

                expect(controller.deleteCallback).toHaveBeenCalled();
            });

            it('should not call deleteCallback if deletion is not successful', function () {
                controller.outcome = {};
                var deferred = q.defer();
                var deleteDeferred = q.defer();
                spyOn(mdDialogMock, 'show').and.returnValue(deferred.promise);
                spyOn(EditOutcomeEntryServiceMock, 'deleteOutcome').and.returnValue(deleteDeferred.promise);
                spyOn(controller, 'deleteCallback');

                controller.deleteOutcome();

                deferred.resolve();
                rootScope.$digest();

                deleteDeferred.reject();
                rootScope.$digest();

                expect(controller.deleteCallback).not.toHaveBeenCalled();
            });

            it('should set saving to false if deletion is successful', function () {
                controller.outcome = {};
                var deferred = q.defer();
                var deleteDeferred = q.defer();
                spyOn(mdDialogMock, 'show').and.returnValue(deferred.promise);
                spyOn(EditOutcomeEntryServiceMock, 'deleteOutcome').and.returnValue(deleteDeferred.promise);
                spyOn(controller, 'deleteCallback');

                controller.deleteOutcome();

                deferred.resolve();
                rootScope.$digest();

                deleteDeferred.resolve();
                rootScope.$digest();

                expect(controller.saving).toBe(false);
            });

            it('should set saving to false if deletion is not successful', function () {
                controller.outcome = {};
                var deferred = q.defer();
                var deleteDeferred = q.defer();
                spyOn(mdDialogMock, 'show').and.returnValue(deferred.promise);
                spyOn(EditOutcomeEntryServiceMock, 'deleteOutcome').and.returnValue(deleteDeferred.promise);
                spyOn(controller, 'deleteCallback');

                controller.deleteOutcome();

                deferred.resolve();
                rootScope.$digest();

                deleteDeferred.reject();
                rootScope.$digest();

                expect(controller.saving).toBe(false);
            });
        });

    });
})();