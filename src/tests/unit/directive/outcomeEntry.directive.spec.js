(function () {
    'use strict';

    describe('Outcome Entry Directive', function () {

        var rootScope,
            compile;

        beforeEach(module('xr.overview'));
        beforeEach(inject(function ($rootScope, $compile, $httpBackend) {
            rootScope = $rootScope;
            compile = $compile;
            $httpBackend.whenGET('overview/entry/outcomeEntry/outcomeEntry.partial.html').respond(200, '');
        }));

        it('should compile', function () {
            var element = angular.element('<outcome-entry></outcome-entry>');
            compile(element)(rootScope);
            rootScope.$digest();
        });

    });
})();