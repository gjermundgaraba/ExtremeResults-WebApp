import { module, inject } from "angular-mocks";

import "../../../app/config/config.module";

(function () {
    'use strict';

    describe('routChangeListener', function () {
        var AuthServiceMock,
            rootScope,
            state,
            q;

        beforeEach(function () {
            module('xr.config', function ($provide) {

                AuthServiceMock = {
                    anyOneLoggedIn: function () {
                    },
                    getCurrentUser: function () {
                    }
                };

                $provide.value('AuthService', AuthServiceMock);

            });

            inject(function ($rootScope, $state, $q) {
                rootScope = $rootScope;
                state = $state;
                q = $q;
            });
        });

        it('should do nothing if the state is login', function () {
            spyOn(AuthServiceMock, 'anyOneLoggedIn');
            spyOn(AuthServiceMock, 'getCurrentUser');
            spyOn(state, 'go');

            rootScope.$broadcast('$stateChangeStart', {
                name: 'login'
            });

            expect(AuthServiceMock.anyOneLoggedIn).not.toHaveBeenCalled();
            expect(AuthServiceMock.getCurrentUser).not.toHaveBeenCalled();
            expect(state.go).not.toHaveBeenCalled();
        });

        it('should do nothing if the state is register', function () {
            spyOn(AuthServiceMock, 'anyOneLoggedIn');
            spyOn(AuthServiceMock, 'getCurrentUser');
            spyOn(state, 'go');

            rootScope.$broadcast('$stateChangeStart', {
                name: 'login'
            });

            expect(AuthServiceMock.anyOneLoggedIn).not.toHaveBeenCalled();
            expect(AuthServiceMock.getCurrentUser).not.toHaveBeenCalled();
            expect(state.go).not.toHaveBeenCalled();
        });

        it('should do nothing if someone is logged in and user is set up', function () {
            spyOn(AuthServiceMock, 'anyOneLoggedIn').and.returnValue(true);
            spyOn(AuthServiceMock, 'getCurrentUser').and.returnValue({});
            spyOn(state, 'go');

            rootScope.$broadcast('$stateChangeStart', {
                name: 'someStateName'
            });

            expect(state.go).not.toHaveBeenCalled();
        });

        it('should go to login if no one is logged in', function () {
            spyOn(AuthServiceMock, 'anyOneLoggedIn').and.returnValue(false);
            spyOn(state, 'go');

            rootScope.$broadcast('$stateChangeStart', {
                name: 'someStateName'
            });

            expect(state.go).toHaveBeenCalledWith('login');
        });
    });
})();