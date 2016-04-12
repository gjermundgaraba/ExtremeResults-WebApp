(function () {
    'use strict';

    describe('CreateOutcome controller', function(){

        var CreateOutcomeServiceMock,
            controller,
            rootScope,
            location,
            outcomeTypeMock,
            formattedEntryDateMock,
            entryHeaderMock,
            relatedEntriesDeferred,
            XrUtilsMock,
            q;

        beforeEach(module('xr.outcomes'));
        beforeEach(module(function ($provide) {
            CreateOutcomeServiceMock = {
                getRelatedEntriesForOutcome: function () {},
                createOutcome: function () {}
            };

            formattedEntryDateMock = 'mockymockmockdate';
            entryHeaderMock = 'headheadheader';
            XrUtilsMock = {
                getFormattedEntryDate: function () { return formattedEntryDateMock },
                getEntryHeader: function () { return entryHeaderMock }
            };

            outcomeTypeMock = {
                className: 'Outcome',
                typeName: 'Daily'
            };

            $provide.value('CreateOutcomeService', CreateOutcomeServiceMock);
            $provide.value('XrUtils', XrUtilsMock);
        }));
        beforeEach(inject(function($controller, $q, $rootScope, $location) {
            q = $q;
            location = $location;
            rootScope = $rootScope;

            relatedEntriesDeferred = q.defer();
            spyOn(CreateOutcomeServiceMock, 'getRelatedEntriesForOutcome').and.returnValue(relatedEntriesDeferred.promise);

            var data = {
                type: outcomeTypeMock
            };
            controller = $controller('CreateOutcomeController', {'$location': location}, data);
        }));

        describe('init', function () {
            it('should get related entries', function () {
                var relatedEntries = [{test: 1}];

                relatedEntriesDeferred.resolve(relatedEntries);
                rootScope.$digest();

                expect(CreateOutcomeServiceMock.getRelatedEntriesForOutcome).toHaveBeenCalledWith(outcomeTypeMock.typeName);
                expect(controller.relatedEntries).toBe(relatedEntries);
            });
        });

        describe('save method', function () {
            var deferred;

            beforeEach(function () {
                deferred = q.defer();
                spyOn(CreateOutcomeServiceMock, 'createOutcome').and.returnValue(deferred.promise);

                controller.createOutcomeForm = {
                    '$someAngularThing': {},
                    'outcome1': { $pristine: true, $valid: true, $setDirty: function() {} },
                    'outcome2': { $pristine: true, $valid: true, $setDirty: function() {} },
                    'outcome3': { $pristine: true, $valid: true, $setDirty: function() {} },
                    $valid: true,
                    $setPristine: function () {}
                }
            });

            it('should not save anything when form is invalid', function () {
                controller.createOutcomeForm.$valid = false;

                controller.save();

                expect(CreateOutcomeServiceMock.createOutcome).not.toHaveBeenCalled();
            });

            it('should save outcomeType', function () {
                controller.save();

                expect(CreateOutcomeServiceMock.createOutcome.calls.mostRecent().args[0].typeName).toBeDefined();
                expect(CreateOutcomeServiceMock.createOutcome.calls.mostRecent().args[0].typeName).toBe(outcomeTypeMock.typeName);
            });

            it('should save all stories', function () {
                controller.outcome1 = "Test1";
                controller.outcome2 = "Test2";
                controller.outcome3 = "Test3";

                controller.save();

                expect(CreateOutcomeServiceMock.createOutcome.calls.mostRecent().args[0].firstStory).toBeDefined();
                expect(CreateOutcomeServiceMock.createOutcome.calls.mostRecent().args[0].firstStory).toBe(controller.outcome1);
                expect(CreateOutcomeServiceMock.createOutcome.calls.mostRecent().args[0].secondStory).toBeDefined();
                expect(CreateOutcomeServiceMock.createOutcome.calls.mostRecent().args[0].secondStory).toBe(controller.outcome2);
                expect(CreateOutcomeServiceMock.createOutcome.calls.mostRecent().args[0].thirdStory).toBeDefined();
                expect(CreateOutcomeServiceMock.createOutcome.calls.mostRecent().args[0].thirdStory).toBe(controller.outcome3);
            });

            describe('finished', function () {
                beforeEach(function () {
                    controller.save();
                });

                it('should change location to overview on post success', function () {
                    spyOn(location, 'path');

                    deferred.resolve();
                    rootScope.$digest();

                    expect(location.path).toHaveBeenCalledWith('overview');
                });
            });
        });

        describe('header', function () {
            it('should have entryheader and date', function () {
                expect(controller.generateHeader()).toBe(entryHeaderMock + ' for ' + formattedEntryDateMock);
            });
        });

    });
})();