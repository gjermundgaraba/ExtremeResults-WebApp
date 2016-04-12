(function () {
    'use strict';

    describe('Outcomes Controller', function(){

        var controller;

        beforeEach(module('xr.outcomes'));
        beforeEach(inject(function($controller) {
            controller = $controller('OutcomesController');
        }));

        describe('init', function () {
            it('should set showCreateOutcome to false as default', function () {
                expect(controller.showCreateOutcome).toEqual(false);
            });
        });

        describe('createOutcome', function () {
            it('should set showCreateOutcome to true', function () {
                controller.createOutcome();

                expect(controller.showCreateOutcome).toEqual(true);
            });

            it('should update the outcomeType with a new typeName', function () {
                var typeName = 'Daily';

                controller.createOutcome(typeName);

                expect(controller.outcomeType.typeName).toEqual(typeName);
            });
        });
    });
})();