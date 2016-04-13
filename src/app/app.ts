namespace xrApp {

    angular
        .module('xr',
        [
            'xr.register',
            'ui.router',
            'angularMoment',
            'ngMaterial',
            'ngCookies',
            'ngAnimate',
            'ngMdIcons',
            'cgBusy',
            'angular-jwt',
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
}