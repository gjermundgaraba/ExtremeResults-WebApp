(function () {
    'use strict';

    describe('Create Reflection Directive', function () {

        var rootScope,
            httpBackend,
            compile;

        beforeEach(function () {
            module('xr.reflections', function ($controllerProvider) {
                $controllerProvider.register('CreateReflectionController', function() {
                });
            });
        });
        beforeEach(inject(function ($rootScope, $compile, $httpBackend) {
            rootScope = $rootScope;
            compile = $compile;
            httpBackend = $httpBackend;

            httpBackend.whenGET('reflections/createReflection/createReflection.partial.html').respond(200, '');
        }));

        it('should compile', function () {
            rootScope.type = {
                className: 'Reflection',
                typeName: 'Weekly'
            };
            var element = angular.element('<xr-create-reflection type="type"></xr-create-reflection>');
            compile(element)(rootScope);
            rootScope.$digest();
            httpBackend.flush();
        });

    });
})();