import { module, inject } from "angular-mocks";

import "../../../app/menuBar/menuBar.module";

(function () {
    'use strict';

    describe('UserInfo Directive', function () {

        var rootScope,
            compile;

        beforeEach(module('xr.menuBar'));
        beforeEach(inject(function ($rootScope, $compile, $httpBackend) {
            rootScope = $rootScope;
            compile = $compile;
            $httpBackend.whenGET('menuBar/menuBar.partial.html').respond(200, '');
        }));

        it('should compile', function () {
            var element = angular.element('<xr-menu-bar></xr-menu-bar>');
            compile(element)(rootScope);
            rootScope.$digest();
        });

    });
})();