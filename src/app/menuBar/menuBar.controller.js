(function () {
    'use strict';

    angular
        .module('xr.menuBar')
        .controller('MenuBarController', MenuBarController);

    MenuBarController.$inject = ['$mdSidenav', 'AuthService', '$rootScope'];

    function MenuBarController($mdSidenav, AuthService, $rootScope) {
        var vm = this;

        vm.toggleSidenav = function(menuId) {
            $mdSidenav(menuId).toggle();
        };

        vm.logout = function () {
            AuthService.logout();
            $rootScope.$broadcast('$stateChangeStart', 'overview');
        };
    }

})();