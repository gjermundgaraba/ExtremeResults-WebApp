import angular from "angular";
import "angular-cookies";
import "angular-jwt";

import "../core/core.module";
import { AuthService } from "./auth.service";
import { HttpHeaderInterceptorFactory } from "./httpInterceptor";

angular.module('xr.auth', ['ngCookies', 'angular-jwt', 'xr.core'])
    .service('AuthService', AuthService)
    .factory('httpHeaderInterceptor', HttpHeaderInterceptorFactory);