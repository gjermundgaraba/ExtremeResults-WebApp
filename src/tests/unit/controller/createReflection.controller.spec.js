(function () {
    'use strict';

    describe('CreateCreateReflection Controller', function(){

        var ParseServiceMock,
            AuthServiceMock,
            userMock,
            controller,
            rootScope,
            location,
            reflectionTypeMock,
            relatedEntriesDeferred,
            XrUtilsMock,
            formattedEntryDateMock,
            entryHeaderMock,
            q;

        beforeEach(module('xr.createReflection'));
        beforeEach(module(function ($provide) {
            ParseServiceMock = {
                postObject: function () {},
                callFunction: function () {}
            };

            userMock = {
                objectId: '1234'
            };
            AuthServiceMock = {
                getCurrentUser: function () {
                    return userMock;
                },
                getUserToken: function () {
                    return '1234';
                }
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

            $provide.value('ParseService', ParseServiceMock);
            $provide.value('reflectionType', reflectionTypeMock);
            $provide.value('XrUtils', XrUtilsMock);
            $provide.value('AuthService', AuthServiceMock);
        }));
        beforeEach(inject(function($controller, $q, $rootScope, $location) {
            q = $q;
            location = $location;
            rootScope = $rootScope;

            relatedEntriesDeferred = q.defer();
            spyOn(ParseServiceMock, 'callFunction').and.returnValue(relatedEntriesDeferred.promise);

            controller = $controller('CreateReflectionController', {'$location': location});
        }));

        describe('init', function () {
            it('should get related entries', function () {
                var relatedEntries = [{test: 1}];

                relatedEntriesDeferred.resolve(relatedEntries);
                rootScope.$digest();

                expect(ParseServiceMock.callFunction).toHaveBeenCalledWith('getRelatedEntriesForReflection', {typeName: reflectionTypeMock.typeName}, AuthServiceMock.getUserToken());
                expect(controller.relatedEntries).toBe(relatedEntries);
            });
        });

        describe('save method', function () {
            var deferred;

            beforeEach(function () {
                deferred = q.defer();
                spyOn(ParseServiceMock, 'postObject').and.returnValue(deferred.promise);

                controller.weeklyReflectionForm = {
                    '$someAngularThing': {},
                    'firstThingThatWentWell': { $pristine: true, $valid: true, $setDirty: function() {} },
                    'secondThingThatWentWell': { $pristine: true, $valid: true, $setDirty: function() {} },
                    'thirdThingThatWentWell': { $pristine: true, $valid: true, $setDirty: function() {} },
                    'firstThingToImprove': { $pristine: true, $valid: true, $setDirty: function() {} },
                    'secondThingToImprove': { $pristine: true, $valid: true, $setDirty: function() {} },
                    'thirdThingToImprove': { $pristine: true, $valid: true, $setDirty: function() {} }
                }
            });


            it('should save to reflectionType className', function () {
                controller.save();

                expect(ParseServiceMock.postObject.calls.mostRecent().args[0]).toBe(reflectionTypeMock.className);
            });

            it('should save outcomeType', function () {
                controller.save();

                expect(ParseServiceMock.postObject.calls.mostRecent().args[1].typeName).toBeDefined();
                expect(ParseServiceMock.postObject.calls.mostRecent().args[1].typeName).toBe(reflectionTypeMock.typeName);
            });


            it('should save all fields', function () {
                controller.firstThingThatWentWell = "Test 11";
                controller.secondThingThatWentWell = "Test 12";
                controller.thirdThingThatWentWell = "Test 13";
                controller.firstThingToImprove = "Test 21";
                controller.secondThingToImprove = "Test 22";
                controller.thirdThingToImprove = "Test 23";

                controller.save();

                expect(ParseServiceMock.postObject.calls.mostRecent().args[1].firstThingThatWentWell).toBeDefined();
                expect(ParseServiceMock.postObject.calls.mostRecent().args[1].firstThingThatWentWell).toBe(controller.firstThingThatWentWell);
                expect(ParseServiceMock.postObject.calls.mostRecent().args[1].secondThingThatWentWell).toBeDefined();
                expect(ParseServiceMock.postObject.calls.mostRecent().args[1].secondThingThatWentWell).toBe(controller.secondThingThatWentWell);
                expect(ParseServiceMock.postObject.calls.mostRecent().args[1].thirdThingThatWentWell).toBeDefined();
                expect(ParseServiceMock.postObject.calls.mostRecent().args[1].thirdThingThatWentWell).toBe(controller.thirdThingThatWentWell);
                expect(ParseServiceMock.postObject.calls.mostRecent().args[1].firstThingToImprove).toBeDefined();
                expect(ParseServiceMock.postObject.calls.mostRecent().args[1].firstThingToImprove).toBe(controller.firstThingToImprove);
                expect(ParseServiceMock.postObject.calls.mostRecent().args[1].secondThingToImprove).toBeDefined();
                expect(ParseServiceMock.postObject.calls.mostRecent().args[1].secondThingToImprove).toBe(controller.secondThingToImprove);
                expect(ParseServiceMock.postObject.calls.mostRecent().args[1].thirdThingToImprove).toBeDefined();
                expect(ParseServiceMock.postObject.calls.mostRecent().args[1].thirdThingToImprove).toBe(controller.thirdThingToImprove);
            });

            it('should set ACL', function () {
                controller.firstThingThatWentWell = "Test 11";
                controller.secondThingThatWentWell = "Test 12";
                controller.thirdThingThatWentWell = "Test 13";
                controller.firstThingToImprove = "Test 21";
                controller.secondThingToImprove = "Test 22";
                controller.thirdThingToImprove = "Test 23";

                controller.save();

                var expectedACL = {
                    '*': { }
                };
                expectedACL[userMock.objectId] = {
                    read: true,
                    write: true
                };
                expect(ParseServiceMock.postObject.calls.mostRecent().args[1].ACL).toBeDefined();
                expect(ParseServiceMock.postObject.calls.mostRecent().args[1].ACL).toEqual(expectedACL);
            });


            it('should save the date as ISO 8601 String', function () {
                controller.save();

                expect(ParseServiceMock.postObject.calls.mostRecent().args[1].effectiveDate).toBeDefined();
                expect(ParseServiceMock.postObject.calls.mostRecent().args[1].effectiveDate.__type).toBe('Date');
                expect(ParseServiceMock.postObject.calls.mostRecent().args[1].effectiveDate.iso).toMatch("[0-9]{4}-[0-1][0-9]-[0-3][0-9]T[0-2][0-9]:[0-5][0-9]:[0-5][0-9].[0-9]{3}Z");
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
                expect(controller.header).toBe(entryHeaderMock + ' for ' + formattedEntryDateMock);
            });
        });

    });
})();