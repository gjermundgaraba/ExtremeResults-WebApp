(function () {
    'use strict';

    describe('UserInfo Directive', function () {

        var rootScope,
            compile;

        beforeEach(module('xr.menuBar'));
        beforeEach(inject(function ($rootScope, $compile, $httpBackend) {
            rootScope = $rootScope;
            compile = $compile;
            $httpBackend.whenGET('menuBar/userInfo/userInfo.partial.html').respond(200, '');
        }));

        it('should compile', function () {
            var element = angular.element('<xr-user-info></xr-user-info>');
            compile(element)(rootScope);
            rootScope.$digest();
        });

    });
})();