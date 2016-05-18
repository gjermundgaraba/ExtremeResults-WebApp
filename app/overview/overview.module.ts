import "../core/core.module";
import "../entry/entry.module";
import { OverviewService } from "./overview.service";
import { OverviewController } from "./overview.controller";

angular
    .module('xr.overview', ['xr.core', 'xr.entry'])
    .service('OverviewService', OverviewService)
    .controller('OverviewController', OverviewController);