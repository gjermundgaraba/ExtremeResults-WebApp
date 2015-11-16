(function () {
    'use strict';

    describe('First Time Help Directive', function () {

        var rootScope,
            compile;

        beforeEach(module('xr.overview'));
        beforeEach(inject(function ($rootScope, $compile, $httpBackend) {
            rootScope = $rootScope;
            compile = $compile;
            $httpBackend.whenGET('overview/firstTimeHelp/firstTimeHelp.partial.html').respond(200, '');
        }));

        it('should compile', function () {
            var element = angular.element('<first-time-help></first-time-help>');
            compile(element)(rootScope);
            rootScope.$digest();
        });

    });
})();