(function () {
    'use strict';

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
                'xr.core',
                'xr.config',
                'xr.auth',
                'xr.login',
                'xr.menuBar',
                'xr.navigation',
                'xr.createOutcome',
                'xr.createReflection',
                'xr.overview',
                'xr.hotSpots',
                'xr.templates', // gets made during build step (see gulpfile)
                'xr.settings'
        ]);
})();