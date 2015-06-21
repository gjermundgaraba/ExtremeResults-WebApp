(function () {
    'use strict';

    describe('CreateOutcome controller', function(){

        var ParseServiceMock,
            FormServiceMock,
            controller,
            rootScope,
            location,
            outcomeTypeMock,
            q;

        beforeEach(module('xr.createOutcome'));
        beforeEach(module(function ($provide) {
            ParseServiceMock = {
                postObject: function () {}
            };

            FormServiceMock = {
                setAllFieldsToDirty: function () {},
                allFieldsAreValid: function () {}
            };

            outcomeTypeMock = 'OutcomeTypeMock';

            $provide.value('ParseService', ParseServiceMock);
            $provide.value('FormService', FormServiceMock);
            $provide.value('outcomeType', outcomeTypeMock);
        }));
        beforeEach(inject(function($controller, $q, $rootScope, $location) {
            q = $q;
            location = $location;
            rootScope = $rootScope;
            controller = $controller('CreateOutcomeController', {'$location': location});
        }));

        describe('save method', function () {
            var deferred;

            beforeEach(function () {
                deferred = q.defer();
                spyOn(ParseServiceMock, 'postObject').and.returnValue(deferred.promise);

                controller.createOutcomeForm = {
                    '$someAngularThing': {},
                    'outcome1': { $pristine: true, $valid: true, $setDirty: function() {} },
                    'outcome2': { $pristine: true, $valid: true, $setDirty: function() {} },
                    'outcome3': { $pristine: true, $valid: true, $setDirty: function() {} }
                }
            });

            it('should set all fields to dirty', function() {
                spyOn(FormServiceMock, 'setAllFieldsToDirty');

                controller.save();

                expect(FormServiceMock.setAllFieldsToDirty).toHaveBeenCalled();
            });

            it('should save if all fields a valid', function () {
                spyOn(FormServiceMock, 'allFieldsAreValid').and.returnValue(true);

                controller.save();

                expect(ParseServiceMock.postObject).toHaveBeenCalled();
            });

            it('should not save if any fields are not valid', function () {
                spyOn(FormServiceMock, 'allFieldsAreValid').and.returnValue(false);

                controller.save();

                expect(ParseServiceMock.postObject).not.toHaveBeenCalled()
            });


            it('should save to outcomeType class', function () {
                spyOn(FormServiceMock, 'allFieldsAreValid').and.returnValue(true);

                controller.save();

                expect(ParseServiceMock.postObject.calls.mostRecent().args[0]).toBe(outcomeTypeMock);
            });

            it('should save all stories', function () {
                spyOn(FormServiceMock, 'allFieldsAreValid').and.returnValue(true);

                controller.outcome1 = "Test1";
                controller.outcome2 = "Test2";
                controller.outcome3 = "Test3";

                controller.save();

                expect(ParseServiceMock.postObject.calls.mostRecent().args[1].firstStory).toBeDefined();
                expect(ParseServiceMock.postObject.calls.mostRecent().args[1].firstStory).toBe(controller.outcome1);
                expect(ParseServiceMock.postObject.calls.mostRecent().args[1].secondStory).toBeDefined();
                expect(ParseServiceMock.postObject.calls.mostRecent().args[1].secondStory).toBe(controller.outcome2);
                expect(ParseServiceMock.postObject.calls.mostRecent().args[1].thirdStory).toBeDefined();
                expect(ParseServiceMock.postObject.calls.mostRecent().args[1].thirdStory).toBe(controller.outcome3);
            });

            describe('finished', function () {
                beforeEach(function () {
                    spyOn(FormServiceMock, 'allFieldsAreValid').and.returnValue(true);
                    controller.save();
                });

                it('should change location to overview on post success', function () {
                    spyOn(location, 'path');

                    deferred.resolve();
                    rootScope.$digest();

                    expect(location.path).toHaveBeenCalledWith('overview');
                });
            });

            describe('header', function () {
               it('should be Outcome Type Mock', function () {
                    expect(controller.header).toBe('Outcome Type Mock');
               });
            });

        });

    });
})();