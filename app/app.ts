import angular from "angular";

import "angular-ui-router";
import "angular-moment";
import "angular-material";
import "angular-cookies";
import "angular-material-icons";
import "angular-busy2";
import "angular-jwt";

import "./main.css!";

import "register/register.module";
import "core/core.module";
import "config/config.module";
import "auth/auth.module";
import "login/login.module";
import "menuBar/menuBar.module";
import "navigation/navigation.module";
import "outcomes/outcomes.module";
import "reflections/reflections.module";
import "overview/overview.module";
import "hotSpots/hotSpots.module";
import "settings/settings.module";
import "templates";

angular
    .module('xr',
        [
            'ui.router',
            'angularMoment',
            'ngMaterial',
            'ngCookies',
            'ngAnimate',
            'ngMdIcons',
            'cgBusy',
            'angular-jwt',
            'xr.register',
            'xr.core',
            'xr.config',
            'xr.auth',
            'xr.login',
            'xr.menuBar',
            'xr.navigation',
            'xr.outcomes',
            'xr.reflections',
            'xr.overview',
            'xr.hotSpots',
            'xr.templates', // gets made during build step (see gulpfile)
            'xr.settings'
        ]);