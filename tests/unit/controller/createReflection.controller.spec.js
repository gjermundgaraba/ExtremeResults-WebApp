import { module, inject } from "angular-mocks";

import "../../../app/reflections/reflections.module";

(function () {
    'use strict';

    describe('CreateCreateReflection Controller', function(){

        var CreateReflectionServiceMock,
            controller,
            scope,
            rootScope,
            location,
            reflectionTypeMock,
            relatedEntriesDeferred,
            XrUtilsMock,
            formattedEntryDateMock,
            entryHeaderMock,
            q;

        beforeEach(module('xr.reflections'));
        beforeEach(module(function ($provide) {
            CreateReflectionServiceMock = {
                createReflection: function () {},
                getRelatedEntriesForReflection: function () {}
            };

            reflectionTypeMock = {
                className: 'Reflection',
                typeName: 'MockType'
            };

            formattedEntryDateMock = 'mockymockmockdate';
            entryHeaderMock = 'headheadheader';
            XrUtilsMock = {
                getFormattedEntryDate: function () { return formattedEntryDateMock },
                getEntryHeader: function () { return entryHeaderMock }
            };

            $provide.value('CreateReflectionService', CreateReflectionServiceMock);
            $provide.value('reflectionType', reflectionTypeMock);
            $provide.value('XrUtils', XrUtilsMock);
        }));
        beforeEach(inject(function($controller, $q, $rootScope, $location) {
            q = $q;
            location = $location;
            scope = $rootScope.$new();
            rootScope = $rootScope;

            relatedEntriesDeferred = q.defer();
            spyOn(CreateReflectionServiceMock, 'getRelatedEntriesForReflection').and.returnValue(relatedEntriesDeferred.promise);

            var data = {
                type: reflectionTypeMock
            };
            controller = $controller('CreateReflectionController', {'$location': location, '$scope': scope}, data);
            scope.$ctrl = controller;
        }));

        describe('init', function () {
            it('should get related entries', function () {
                var relatedEntries = [{test: 1}];

                relatedEntriesDeferred.resolve(relatedEntries);
                rootScope.$digest();

                expect(CreateReflectionServiceMock.getRelatedEntriesForReflection).toHaveBeenCalledWith(reflectionTypeMock.typeName, controller.effectiveDate);
                expect(controller.relatedEntries).toBe(relatedEntries);
            });
        });

        describe('save method', function () {
            var deferred;

            beforeEach(function () {
                deferred = q.defer();
                spyOn(CreateReflectionServiceMock, 'createReflection').and.returnValue(deferred.promise);

                controller.weeklyReflectionForm = {
                    '$someAngularThing': {},
                    'firstThingThatWentWell': { $pristine: true, $valid: true, $setDirty: function() {} },
                    'secondThingThatWentWell': { $pristine: true, $valid: true, $setDirty: function() {} },
                    'thirdThingThatWentWell': { $pristine: true, $valid: true, $setDirty: function() {} },
                    'firstThingToImprove': { $pristine: true, $valid: true, $setDirty: function() {} },
                    'secondThingToImprove': { $pristine: true, $valid: true, $setDirty: function() {} },
                    'thirdThingToImprove': { $pristine: true, $valid: true, $setDirty: function() {} },
                    $valid: true,
                    $setPristine: function () {}
                }
            });

            it('should not save anything when form is invalid', function () {
                controller.weeklyReflectionForm.$valid = false;

                controller.save();

                expect(CreateReflectionServiceMock.createReflection).not.toHaveBeenCalled();
            });

            it('should save outcomeType', function () {
                controller.save();

                expect(CreateReflectionServiceMock.createReflection.calls.mostRecent().args[0].typeName).toBeDefined();
                expect(CreateReflectionServiceMock.createReflection.calls.mostRecent().args[0].typeName).toBe(reflectionTypeMock.typeName);
            });


            it('should save all fields', function () {
                controller.firstThingThatWentWell = "Test 11";
                controller.secondThingThatWentWell = "Test 12";
                controller.thirdThingThatWentWell = "Test 13";
                controller.firstThingToImprove = "Test 21";
                controller.secondThingToImprove = "Test 22";
                controller.thirdThingToImprove = "Test 23";

                controller.save();

                expect(CreateReflectionServiceMock.createReflection.calls.mostRecent().args[0].firstThingThatWentWell).toBeDefined();
                expect(CreateReflectionServiceMock.createReflection.calls.mostRecent().args[0].firstThingThatWentWell).toBe(controller.firstThingThatWentWell);
                expect(CreateReflectionServiceMock.createReflection.calls.mostRecent().args[0].secondThingThatWentWell).toBeDefined();
                expect(CreateReflectionServiceMock.createReflection.calls.mostRecent().args[0].secondThingThatWentWell).toBe(controller.secondThingThatWentWell);
                expect(CreateReflectionServiceMock.createReflection.calls.mostRecent().args[0].thirdThingThatWentWell).toBeDefined();
                expect(CreateReflectionServiceMock.createReflection.calls.mostRecent().args[0].thirdThingThatWentWell).toBe(controller.thirdThingThatWentWell);
                expect(CreateReflectionServiceMock.createReflection.calls.mostRecent().args[0].firstThingToImprove).toBeDefined();
                expect(CreateReflectionServiceMock.createReflection.calls.mostRecent().args[0].firstThingToImprove).toBe(controller.firstThingToImprove);
                expect(CreateReflectionServiceMock.createReflection.calls.mostRecent().args[0].secondThingToImprove).toBeDefined();
                expect(CreateReflectionServiceMock.createReflection.calls.mostRecent().args[0].secondThingToImprove).toBe(controller.secondThingToImprove);
                expect(CreateReflectionServiceMock.createReflection.calls.mostRecent().args[0].thirdThingToImprove).toBeDefined();
                expect(CreateReflectionServiceMock.createReflection.calls.mostRecent().args[0].thirdThingToImprove).toBe(controller.thirdThingToImprove);
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

        describe('change effectiveDate', function () {
            beforeEach(function () {
                var relatedEntries = [{test: 1}];

                relatedEntriesDeferred.resolve(relatedEntries);
                rootScope.$digest();
            });

           it('should update related entries for reflection', function () {
               controller.effectiveDate = new Date();

               var relatedEntries = [{test: 1}];

               relatedEntriesDeferred.resolve(relatedEntries);
               rootScope.$digest();

               expect(CreateReflectionServiceMock.getRelatedEntriesForReflection.calls.count()).toBe(2);
           });
        });

        describe('change typeName', function () {
            beforeEach(function () {
                var relatedEntries = [{test: 1}];

                relatedEntriesDeferred.resolve(relatedEntries);
                rootScope.$digest();
            });

            it('should update related entries for reflection', function () {
                controller.type.typeName = 'teee';

                var relatedEntries = [{test: 1}];

                relatedEntriesDeferred.resolve(relatedEntries);
                rootScope.$digest();

                expect(CreateReflectionServiceMock.getRelatedEntriesForReflection.calls.count()).toBe(2);
            });
        });

        describe('header', function () {
            it('should have entryheader and date', function () {
                expect(controller.generateHeader()).toBe(entryHeaderMock + ' for ' + formattedEntryDateMock);
            });
        });

    });
})();