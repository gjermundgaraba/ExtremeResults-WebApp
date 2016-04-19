import { NavigationController } from "./navigation.controller";
import { navigationComponent } from "./navigation.directive";

    angular
        .module('xr.navigation', [])
        .controller('NavigationController', NavigationController)
        .component('xrNavigation', navigationComponent);