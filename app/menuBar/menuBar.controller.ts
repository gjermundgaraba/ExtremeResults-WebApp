
import ISidenavService = angular.material.ISidenavService;
import IScope = angular.IScope;

import { AuthService } from "../auth/auth.service";


export class MenuBarController {
    static $inject = ['$mdSidenav', 'AuthService', '$rootScope'];

    constructor(private $mdSidenav: ISidenavService, private authService: AuthService, private $rootScope: IScope) {}

    toggleSidenav(menuId: string): void {
        this.$mdSidenav(menuId).toggle();
    }

    logout(): void {
        this.authService.logout();
        this.$rootScope.$broadcast('$stateChangeStart', 'overview');
    };
}