NavigationController.$inject = ['$mdSidenav', '$state'];

function NavigationController($mdSidenav, $state) {
    var $ctrl = this;

    $ctrl.goToState = function (state) {
        $state.go(state);
        $mdSidenav('left').close();
    };
}

export { NavigationController };