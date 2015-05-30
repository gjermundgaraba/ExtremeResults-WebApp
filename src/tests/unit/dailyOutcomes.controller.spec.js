(function () {
    'use strict';

    describe('DailyOutcomes Controller', function(){

        var ParseServiceMock,
            FormServiceMock,
            controller,
            q;

        beforeEach(module('xr.dailyOutcomes'));
        beforeEach(module(function ($provide) {
            ParseServiceMock = {
                postObject: function () {}
            };

            FormServiceMock = {
                setAllFieldsToDirty: function () {},
                allFieldsAreValid: function () {}
            };

            $provide.value('ParseService', ParseServiceMock);
            $provide.value('FormService', FormServiceMock);
        }));
        beforeEach(inject(function($controller, $q) {
            q = $q;
            controller = $controller('DailyOutcomesController');
        }));

        describe('save method', function () {
            beforeEach(function () {
                spyOn(ParseServiceMock, 'postObject');

                controller.dailyOutcomesForm = {
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


            it('should save to DailyOutcome class', function () {
                spyOn(FormServiceMock, 'allFieldsAreValid').and.returnValue(true);

                controller.save();

                expect(ParseServiceMock.postObject.calls.mostRecent().args[0]).toBe('DailyOutcome');
            });

            it('should save the date as ISO 8601 String', function () {
                spyOn(FormServiceMock, 'allFieldsAreValid').and.returnValue(true);

                controller.save();

                expect(ParseServiceMock.postObject.calls.mostRecent().args[1].date).toBeDefined();
                expect(ParseServiceMock.postObject.calls.mostRecent().args[1].date.__type).toBe('Date');
                expect(ParseServiceMock.postObject.calls.mostRecent().args[1].date.iso).toMatch("[0-9]{4}-[0-1][0-9]-[0-3][0-9]T[0-2][0-9]:[0-5][0-9]:[0-5][0-9].[0-9]{3}Z");
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
            })
        });

    });
})();