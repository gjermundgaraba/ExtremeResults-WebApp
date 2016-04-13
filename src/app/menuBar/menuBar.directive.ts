namespace xrApp {

    angular
        .module('xr.menuBar')
        .component('xrMenuBar', {
            templateUrl: 'menuBar/menuBar.partial.html',
            controller: 'MenuBarController'
        });
}