import { module, inject } from "angular-mocks";

import "../../../app/entryList/entryList.module";

(function () {
    'use strict';

    describe('Entry List Directive', function () {

        var rootScope,
            httpBackend,
            compile;

        beforeEach(function () {
            module('xr.entryList', function ($controllerProvider) {
                $controllerProvider.register('EntryListController', function() {
                });
            });
        });
        beforeEach(inject(function ($rootScope, $compile, $httpBackend) {
            rootScope = $rootScope;
            compile = $compile;
            httpBackend = $httpBackend;

            $httpBackend.whenGET('entryList/entryList.partial.html').respond(200, '');
        }));

        it('should compile', function () {
            var element = angular.element('<entry-list></entry-list>');
            compile(element)(rootScope);
            rootScope.$digest();
            httpBackend.flush();
        });

    });
})();