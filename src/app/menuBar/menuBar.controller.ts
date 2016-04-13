namespace xrApp {

    angular
        .module('xr.menuBar')
        .controller('MenuBarController', MenuBarController);

    MenuBarController.$inject = ['$mdSidenav', 'AuthService', '$rootScope'];

    function MenuBarController($mdSidenav, AuthService, $rootScope) {
        var $ctrl = this;

        $ctrl.toggleSidenav = function (menuId) {
            $mdSidenav(menuId).toggle();
        };

        $ctrl.logout = function () {
            AuthService.logout();
            $rootScope.$broadcast('$stateChangeStart', 'overview');
        };
    }
}