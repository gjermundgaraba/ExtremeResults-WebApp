(function () {
    'use strict';

    describe('Menu Bar Controller', function(){

        var AuthServiceMock,
            sideNavToggled,
            $mdSidenavMock,
            controller,
            rootScope;

        beforeEach(module('xr.menuBar'));
        beforeEach(module(function ($provide) {
            AuthServiceMock = {
                logout: function () {}
            };

            sideNavToggled = false;
            $mdSidenavMock = function () {
                return {
                    toggle: function () {
                        sideNavToggled = true;
                    }
                }
            };

            $provide.value('AuthService', AuthServiceMock);
            $provide.value('$mdSidenav', $mdSidenavMock);
        }));
        beforeEach(inject(function($controller, $rootScope) {
            rootScope = $rootScope;

            controller = $controller('MenuBarController');
        }));

        describe('toggleSideNav', function () {

            it('should toggle the menu id', function () {
                controller.toggleSidenav('123');

                expect(sideNavToggled).toBe(true);
            });

        });

        describe('logout', function () {
            it('should call logout', function () {
                spyOn(AuthServiceMock, 'logout');

                controller.logout();

                expect(AuthServiceMock.logout).toHaveBeenCalled();
            });
        });

    });
})();