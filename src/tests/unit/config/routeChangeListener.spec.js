(function () {
    'use strict';

    describe('routChangeListener', function () {
        var AuthServiceMock,
            rootScope,
            state,
            q;

        // Get the provider
        beforeEach(function () {
            module('xr.config', function ($provide) {

                AuthServiceMock = {
                    anyOneLoggedIn: function () {
                    },
                    getCurrentUser: function () {
                    },
                    updateCurrentUser: function () {
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
            spyOn(AuthServiceMock, 'updateCurrentUser');
            spyOn(state, 'go');

            rootScope.$broadcast('$stateChangeStart', {
                name: 'login'
            });

            expect(AuthServiceMock.anyOneLoggedIn).not.toHaveBeenCalled();
            expect(AuthServiceMock.getCurrentUser).not.toHaveBeenCalled();
            expect(AuthServiceMock.updateCurrentUser).not.toHaveBeenCalled();
            expect(state.go).not.toHaveBeenCalled();
        });

        it('should do nothing if the state is register', function () {
            spyOn(AuthServiceMock, 'anyOneLoggedIn');
            spyOn(AuthServiceMock, 'getCurrentUser');
            spyOn(AuthServiceMock, 'updateCurrentUser');
            spyOn(state, 'go');

            rootScope.$broadcast('$stateChangeStart', {
                name: 'login'
            });

            expect(AuthServiceMock.anyOneLoggedIn).not.toHaveBeenCalled();
            expect(AuthServiceMock.getCurrentUser).not.toHaveBeenCalled();
            expect(AuthServiceMock.updateCurrentUser).not.toHaveBeenCalled();
            expect(state.go).not.toHaveBeenCalled();
        });

        it('should do nothing if someone is logged in and user is set up', function () {
            spyOn(AuthServiceMock, 'anyOneLoggedIn').and.returnValue(true);
            spyOn(AuthServiceMock, 'getCurrentUser').and.returnValue({});
            spyOn(AuthServiceMock, 'updateCurrentUser');
            spyOn(state, 'go');

            rootScope.$broadcast('$stateChangeStart', {
                name: 'someStateName'
            });

            expect(AuthServiceMock.updateCurrentUser).not.toHaveBeenCalled();
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

        it('should update current user if logged in but user not set up', function () {
            spyOn(AuthServiceMock, 'anyOneLoggedIn').and.returnValue(true);
            spyOn(AuthServiceMock, 'getCurrentUser').and.returnValue(undefined);
            spyOn(AuthServiceMock, 'updateCurrentUser').and.returnValue(q.defer().promise);

            rootScope.$broadcast('$stateChangeStart', {
                name: 'someStateName'
            });

            expect(AuthServiceMock.updateCurrentUser).toHaveBeenCalled();
        });

        it('should go to the appropriate state after the user has been updated', function () {
            var deferred = q.defer();
            spyOn(AuthServiceMock, 'anyOneLoggedIn').and.returnValue(true);
            spyOn(AuthServiceMock, 'getCurrentUser').and.returnValue(undefined);
            spyOn(AuthServiceMock, 'updateCurrentUser').and.returnValue(deferred.promise);
            spyOn(state, 'go');

            var toState = {
                name: 'someStateName'
            };
            rootScope.$broadcast('$stateChangeStart', toState);

            deferred.resolve();
            rootScope.$digest();

            expect(state.go).toHaveBeenCalledWith(toState);
        });

        it('should go to login if update of user fails', function () {
            var deferred = q.defer();
            spyOn(AuthServiceMock, 'anyOneLoggedIn').and.returnValue(true);
            spyOn(AuthServiceMock, 'getCurrentUser').and.returnValue(undefined);
            spyOn(AuthServiceMock, 'updateCurrentUser').and.returnValue(deferred.promise);
            spyOn(state, 'go');

            var toState = {
                name: 'someStateName'
            };
            rootScope.$broadcast('$stateChangeStart', toState);

            deferred.reject();
            rootScope.$digest();

            expect(state.go).toHaveBeenCalledWith('login');
        });

    });
})();