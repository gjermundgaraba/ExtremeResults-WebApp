(function () {
    'use strict';

    angular.module('xr.config')
        .run(['AuthService', '$rootScope', '$state', function (AuthService, $rootScope, $state) {
            $rootScope.$on('$stateChangeStart', function (event, toState) {
                if (toState.name !== 'login' && toState.name !== 'register' && !AuthService.anyOneLoggedIn()) {
                    event.preventDefault();
                    $state.go('login');
                }
            });
        }]);
})();