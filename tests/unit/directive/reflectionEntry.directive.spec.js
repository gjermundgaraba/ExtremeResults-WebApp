import { module, inject } from "angular-mocks";

import "../../../app/overview/overview.module";

(function () {
    'use strict';

    describe('Reflection Entry Directive', function () {

        var rootScope,
            compile;

        beforeEach(module('xr.overview'));
        beforeEach(inject(function ($rootScope, $compile, $httpBackend) {
            rootScope = $rootScope;
            compile = $compile;
            $httpBackend.whenGET('overview/entry/reflectionEntry/reflectionEntry.partial.html').respond(200, '');
        }));

        it('should compile', function () {
            var element = angular.element('<reflection-entry></reflection-entry>');
            compile(element)(rootScope);
            rootScope.$digest();
        });

    });
})();