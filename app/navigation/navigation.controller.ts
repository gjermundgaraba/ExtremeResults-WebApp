import ISidenavService = angular.material.ISidenavService;
import IStateService = angular.ui.IStateService;

export class NavigationController {
    static $inject = ['$mdSidenav', '$state'];

    constructor(private $mdSidenav:ISidenavService, private $state:IStateService) {}

    goToState(state:string):void {
        this.$state.go(state);
        this.$mdSidenav('left').close();
    };
}