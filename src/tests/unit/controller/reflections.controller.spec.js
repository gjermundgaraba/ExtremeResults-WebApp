(function () {
    'use strict';

    describe('Reflections Controller', function(){

        var controller;

        beforeEach(module('xr.reflections'));
        beforeEach(inject(function($controller) {
            controller = $controller('ReflectionsController');
        }));

        describe('init', function () {
            it('should set showCreateReflection to false as default', function () {
                expect(controller.showCreateReflection).toEqual(false);
            });
        });

        describe('createReflection', function () {
            it('should set showCreateReflection to true', function () {
                controller.createReflection();

                expect(controller.showCreateReflection).toEqual(true);
            });

            it('should update the outcomeType with a new typeName', function () {
                var typeName = 'Daily';

                controller.createReflection(typeName);

                expect(controller.reflectionType.typeName).toEqual(typeName);
            });
        });
    });
})();