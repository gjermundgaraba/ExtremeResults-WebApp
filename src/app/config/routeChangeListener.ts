(function () {
    'use strict';

    angular.module('xr.config')
        .run(['AuthService', '$rootScope', '$state', function (AuthService, $rootScope, $state) {
            $rootScope.$on('$stateChangeStart', function (event, toState) {
                if (toState.name !== 'login' && toState.name !== 'register') {
                    if (!AuthService.anyOneLoggedIn()) {
                        event.preventDefault();
                        $state.go('login');
                    } else if (typeof AuthService.getCurrentUser() === 'undefined') {
                        event.preventDefault();
                        AuthService.updateCurrentUser()
                            .then(function () {
                                $state.go(toState);
                            })
                            .catch(function () {
                                $state.go('login');
                            });
                    }
                }
            });
        }]);
})();