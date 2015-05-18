(function () {
    'use strict';

    describe('DailyOutcomes Controller', function(){

        var ObjectServiceMock,
            controller,
            q;

        beforeEach(module('xr.dailyOutcomes'));
        beforeEach(module(function ($provide) {
            ObjectServiceMock = {
                postObject: function () {}
            };

            $provide.value('ParseObjectService', ObjectServiceMock);
        }));
        beforeEach(inject(function($controller, $q) {
            q = $q;
            controller = $controller('DailyOutcomesController');
        }));

        describe('save', function () {
            beforeEach(function () {
                spyOn(ObjectServiceMock, 'postObject');

                controller.dailyOutcomesForm = {
                    '$someAngularThing': {},
                    'outcome1': { $pristine: true, $valid: true, $setDirty: function() {} },
                    'outcome2': { $pristine: true, $valid: true, $setDirty: function() {} },
                    'outcome3': { $pristine: true, $valid: true, $setDirty: function() {} }
                }
            });

            it('should set all fields to dirty', function() {
                spyOn(controller.dailyOutcomesForm.outcome1, '$setDirty');
                spyOn(controller.dailyOutcomesForm.outcome2, '$setDirty');
                spyOn(controller.dailyOutcomesForm.outcome3, '$setDirty');

                controller.save();

                expect(controller.dailyOutcomesForm.outcome1.$setDirty).toHaveBeenCalled();
                expect(controller.dailyOutcomesForm.outcome2.$setDirty).toHaveBeenCalled();
                expect(controller.dailyOutcomesForm.outcome3.$setDirty).toHaveBeenCalled();
            });

            it('should save if all fields a valid', function () {
                controller.save();

                expect(ObjectServiceMock.postObject).toHaveBeenCalled();
            });

            it('should not save if any fields are not valid', function () {
                controller.dailyOutcomesForm.outcome2.$valid = false;

                controller.save();

                expect(ObjectServiceMock.postObject).not.toHaveBeenCalled()
            });


            it('should save to DailyOutcome class', function () {
                controller.save();

                expect(ObjectServiceMock.postObject.calls.mostRecent().args[0]).toBe('DailyOutcome');
            });

            it('should save the date as ISO 8601 String', function () {
                controller.save();

                expect(ObjectServiceMock.postObject.calls.mostRecent().args[1].date).toBeDefined();
                expect(ObjectServiceMock.postObject.calls.mostRecent().args[1].date.__type).toBe('Date');
                expect(ObjectServiceMock.postObject.calls.mostRecent().args[1].date.iso).toMatch("[0-9]{4}-[0-1][0-9]-[0-3][0-9]T[0-2][0-9]:[0-5][0-9]:[0-5][0-9].[0-9]{3}Z");
            });

            it('should save all stories', function () {
                controller.outcome1 = "Test1";
                controller.outcome2 = "Test2";
                controller.outcome3 = "Test3";

                controller.save();

                expect(ObjectServiceMock.postObject.calls.mostRecent().args[1].firstStory).toBeDefined();
                expect(ObjectServiceMock.postObject.calls.mostRecent().args[1].firstStory).toBe(controller.outcome1);
                expect(ObjectServiceMock.postObject.calls.mostRecent().args[1].secondStory).toBeDefined();
                expect(ObjectServiceMock.postObject.calls.mostRecent().args[1].secondStory).toBe(controller.outcome2);
                expect(ObjectServiceMock.postObject.calls.mostRecent().args[1].thirdStory).toBeDefined();
                expect(ObjectServiceMock.postObject.calls.mostRecent().args[1].thirdStory).toBe(controller.outcome3);
            })
        });

    });
})();