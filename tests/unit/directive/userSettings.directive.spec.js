import { module, inject } from "angular-mocks";

import "../../../app/settings/settings.module";

(function () {
    'use strict';

    describe('User Settings Directive', function () {

        var rootScope,
            httpBackend,
            compile;

        beforeEach(module('xr.settings'));
        beforeEach(inject(function ($rootScope, $compile, $httpBackend) {
            rootScope = $rootScope;
            compile = $compile;
            httpBackend = $httpBackend;

            $httpBackend.whenGET('settings/userSettings/userSettings.partial.html').respond(200, '');
        }));

        it('should compile', function () {
            var element = angular.element('<xr-user-settings></xr-user-settings>');
            compile(element)(rootScope);
            rootScope.$digest();
            httpBackend.flush();
        });

    });
})();