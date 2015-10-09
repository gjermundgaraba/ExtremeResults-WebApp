(function () {
    'use strict';

    describe('Login Controller', function(){

        var AuthServiceMock,
            $stateMock,
            controller,
            q;

        beforeEach(module('xr.login'));
        beforeEach(module(function ($provide) {
            AuthServiceMock = {
                login: function () {}
            };

            $stateMock = {
                go: function () {}
            };

            $provide.value('AuthService', AuthServiceMock);
            $provide.value('$state', $stateMock);
        }));
        beforeEach(inject(function($controller, $q) {
            q = $q;

            controller = $controller('LoginController');
        }));

        describe('login', function () {
            var loginDeferred;

            beforeEach(function () {
                loginDeferred = q.defer();
                spyOn(AuthServiceMock, 'login').and.returnValue(loginDeferred.promise);
            });

            it('should set the is logging in to true', function () {
                controller.login();
                expect(controller.isLoggingIn).toBe(true);
            });
        });

    });
})();