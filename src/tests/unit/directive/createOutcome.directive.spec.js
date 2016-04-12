(function () {
    'use strict';

    describe('Create Outcome Directive', function () {

        var rootScope,
            compile;

        beforeEach(module('xr.outcomes'));
        beforeEach(inject(function ($rootScope, $compile, $httpBackend) {
            rootScope = $rootScope;
            compile = $compile;
            $httpBackend.whenGET('outcomes/createOutcome/createOutcome.partial.html').respond(200, '');
        }));

        it('should compile', function () {
            var element = angular.element('<xr-create-outcome></xr-create-outcome>');
            compile(element)(rootScope);
            rootScope.$digest();
        });

    });
})();