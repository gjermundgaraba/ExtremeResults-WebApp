(function () {
    'use strict';

    describe('Login Controller', function(){

        var AuthServiceMock,
            $stateMock,
            controller,
            scope,
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
        beforeEach(inject(function($controller, $q, $rootScope) {
            q = $q;
            scope = $rootScope;

            controller = $controller('LoginController');
        }));

        describe('login', function () {
            var loginDeferred;

            beforeEach(function () {
                loginDeferred = q.defer();
                spyOn(AuthServiceMock, 'login').and.returnValue(loginDeferred.promise);
            });

            it('should set the isLoggingIn to true', function () {
                controller.login();
                expect(controller.isLoggingIn).toBe(true);
            });


            it('should send username and password to auth service', function () {
                controller.username = 'usernametest';
                controller.passoword = 'usernamepwd';

                controller.login();

                expect(AuthServiceMock.login).toHaveBeenCalledWith(controller.username, controller.password);
            });

            describe('login succeeds', function () {
                beforeEach(function () {
                    spyOn($stateMock, 'go');
                    controller.login();
                    loginDeferred.resolve();
                    scope.$digest();
                });

                it('should go to app.overview', function () {
                    expect($stateMock.go).toHaveBeenCalledWith('app.overview');
                });

                it('should set isLoggingIn to false', function () {
                    expect(controller.isLoggingIn).toBe(false);
                });
            });

            describe('login fails', function () {
                beforeEach(function () {
                    spyOn($stateMock, 'go');
                    controller.login();
                    loginDeferred.reject();
                    scope.$digest();
                });

                it('should set isLoggingIn to false', function () {
                    expect(controller.isLoggingIn).toBe(false);
                });
            })
        });

    });
})();