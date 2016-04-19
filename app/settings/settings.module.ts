import angular from "angular";

import { userSettingsComponent } from "./userSettings/userSettings.directive";

angular.module('xr.settings', [])
    .component('xrUserSettings', userSettingsComponent);