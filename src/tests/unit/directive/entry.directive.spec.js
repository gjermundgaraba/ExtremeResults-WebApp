(function () {
    'use strict';

    describe('Entry Directive', function () {

        var rootScope,
            compile;

        beforeEach(module('xr.overview'));
        beforeEach(inject(function ($rootScope, $compile, $httpBackend) {
            rootScope = $rootScope;
            compile = $compile;
            $httpBackend.whenGET('overview/entry/entry.partial.html').respond(200, '');
        }));

        it('should compile', function () {
            var element = angular.element('<overview-entry></overview-entry>');
            compile(element)(rootScope);
            rootScope.$digest();
        });

    });
})();