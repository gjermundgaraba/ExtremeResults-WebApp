(function () {
    'use strict';

    describe('Register Controller', function(){

        var AuthServiceMock,
            $stateMock,
            controller,
            scope,
            q;

        beforeEach(module('xr.register'));
        beforeEach(module(function ($provide) {
            AuthServiceMock = {
                register: function () {}
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

            controller = $controller('RegisterController');
            controller.registerForm = {
                $valid: true
            };
        }));

        describe('register', function () {
            var registerDeferred;

            beforeEach(function () {
                registerDeferred = q.defer();
                spyOn(AuthServiceMock, 'register').and.returnValue(registerDeferred.promise);
            });

            it('should set the isRegistering to true', function () {
                controller.register();
                expect(controller.isRegistering).toBe(true);
            });


            it('should send username and password to auth service', function () {
                controller.username = 'usernametest';
                controller.passoword = 'usernamepwd';

                controller.register();

                expect(AuthServiceMock.register).toHaveBeenCalledWith({username: controller.username, password: controller.password});
            });

            describe('register succeeds', function () {
                beforeEach(function () {
                    spyOn($stateMock, 'go');
                    controller.register();
                    registerDeferred.resolve();
                    scope.$digest();
                });

                it('should go to app.overview', function () {
                    expect($stateMock.go).toHaveBeenCalledWith('app.overview');
                });

                it('should set isRegistering to false', function () {
                    expect(controller.isRegistering).toBe(false);
                });
            });

            describe('register fails', function () {
                beforeEach(function () {
                    spyOn($stateMock, 'go');
                    controller.register();
                    registerDeferred.reject();
                    scope.$digest();
                });

                it('should set isRegistering to false', function () {
                    expect(controller.isRegistering).toBe(false);
                });
            })
        });

    });
})();