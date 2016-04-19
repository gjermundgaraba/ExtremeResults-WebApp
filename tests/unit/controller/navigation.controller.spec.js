import { module, inject } from "angular-mocks";

import "../../../app/navigation/navigation.module";

(function () {
    'use strict';

    describe('Navigation Controller', function(){

        var mdSidenavMock,
            stateMock,
            controller;

        beforeEach(module('xr.navigation'));
        beforeEach(module(function ($provide) {
            mdSidenavMock = function() {
                return {
                    close: function () {}
                }
            };

            stateMock = {
                go: function () {}
            };

            $provide.value('$mdSidenav', mdSidenavMock);
            $provide.value('$state', stateMock);
        }));
        beforeEach(inject(function($controller) {
            controller = $controller('NavigationController');
        }));

        describe('goToState', function () {
            it('should go to the correct state', function () {
                spyOn(stateMock, 'go');
                var state = 'app.some-state';

                controller.goToState(state);

                expect(stateMock.go).toHaveBeenCalledWith(state);
            });
        });
    });
})();