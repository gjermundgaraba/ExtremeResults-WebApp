(function () {
    'use strict';

    describe('User Info Controller', function(){

        var AuthServiceMock,
            currentUserMock,
            controller,
            rootScope;

        beforeEach(module('xr.menuBar'));
        beforeEach(module(function ($provide) {
            currentUserMock = {
                username: 'Steve Holt!'
            };
            AuthServiceMock = {
                getCurrentUser: function () {
                    return currentUserMock;
                }
            };

            $provide.value('AuthService', AuthServiceMock);
        }));
        beforeEach(inject(function($controller, $rootScope) {
            rootScope = $rootScope;

            controller = $controller('UserInfoController');
        }));

        describe('init', function () {

            it('should get current user', function () {
                expect(controller.currentUser).toBe(currentUserMock);
            });

        });
    });
})();