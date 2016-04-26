import { module, inject } from "angular-mocks";

import "../../../app/menuBar/menuBar.module";

(function () {
    'use strict';

    describe('UserInfo Directive', function () {

        var rootScope,
            httpBackend,
            compile;

        beforeEach(function () {
            module('xr.menuBar', function ($controllerProvider) {
                $controllerProvider.register('UserInfoController', function() {
                });
            });
        });
        beforeEach(inject(function ($rootScope, $compile, $httpBackend) {
            rootScope = $rootScope;
            compile = $compile;
            httpBackend = $httpBackend;

            $httpBackend.whenGET('menuBar/userInfo/userInfo.partial.html').respond(200, '');
        }));

        it('should compile', function () {
            var element = angular.element('<xr-user-info></xr-user-info>');
            compile(element)(rootScope);
            rootScope.$digest();
            httpBackend.flush();
        });

    });
})();