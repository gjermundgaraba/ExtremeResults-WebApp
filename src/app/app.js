(function () {
    'use strict';

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
            'xr.core',
            'xr.config',
            'xr.auth',
            'xr.login',
            'xr.register',
            'xr.menuBar',
            'xr.navigation',
            'xr.templates', // gets made during build step (see gulpfile)
            'xr.createOutcome',
            'xr.createReflection',
            'xr.overview',
            'xr.hotSpots'
        ]);
})();