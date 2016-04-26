import { module, inject } from "angular-mocks";

import "../../../app/outcomes/outcomes.module";

(function () {
    'use strict';

    describe('Create Outcome Directive', function () {

        var rootScope,
            httpBackend,
            compile;

        beforeEach(function () {
            module('xr.outcomes', function ($controllerProvider) {
                $controllerProvider.register('CreateOutcomeController', function() {
                });
            });
        });
        beforeEach(inject(function ($rootScope, $compile, $httpBackend) {
            rootScope = $rootScope;
            compile = $compile;
            httpBackend = $httpBackend;


            $httpBackend.whenGET('outcomes/createOutcome/createOutcome.partial.html').respond(200, '');
        }));

        it('should compile', function () {
            var element = angular.element('<xr-create-outcome></xr-create-outcome>');
            compile(element)(rootScope);
            rootScope.$digest();
            httpBackend.flush();
        });

    });
})();