(function () {
    'use strict';

    describe('Navigation Directive', function () {

        var rootScope,
            compile;

        beforeEach(module('xr.navigation'));
        beforeEach(inject(function ($rootScope, $compile, $httpBackend) {
            rootScope = $rootScope;
            compile = $compile;
            $httpBackend.whenGET('navigation/navigation.partial.html').respond(200, '');
        }));

        it('should compile', function () {
            var element = angular.element('<xr-navigation></xr-navigation>');
            compile(element)(rootScope);
            rootScope.$digest();
        });

    });
})();