import { module, inject } from "angular-mocks";

import "../../../app/navigation/navigation.module";

(function () {
    'use strict';

    describe('Navigation Directive', function () {

        var rootScope,
            httpBackend,
            compile;

        beforeEach(function () {
            module('xr.navigation', function ($controllerProvider) {
                $controllerProvider.register('NavigationController', function() {
                });
            });
        });
        beforeEach(inject(function ($rootScope, $compile, $httpBackend) {
            rootScope = $rootScope;
            compile = $compile;
            httpBackend = $httpBackend;

            $httpBackend.whenGET('navigation/navigation.partial.html').respond(200, '');
        }));

        it('should compile', function () {
            var element = angular.element('<xr-navigation></xr-navigation>');
            compile(element)(rootScope);
            rootScope.$digest();
            httpBackend.flush();
        });

    });
})();