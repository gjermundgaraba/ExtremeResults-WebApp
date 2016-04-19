import angular from "angular";
import "angular-ui-router";
import "angular-material";

import "../auth/auth.module";
import { interceptorConfig } from "./interceptorConfig";
import { routeChangeListener } from "./routeChangeListener";
import { routing } from "./routing";
import { theming } from "./theming";

angular.module('xr.config', ['xr.auth', 'ui.router', 'ngMaterial'])
    .config(['$httpProvider', interceptorConfig])
    .run(['AuthService', '$rootScope', '$state', routeChangeListener])
    .config(['$stateProvider', '$urlRouterProvider', routing])
    .config(theming);
