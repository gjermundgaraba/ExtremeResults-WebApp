import angular from "angular";

import "../core/core.module";
import { EditHotSpotBucketController } from "./editHotSpotBucket/editHotSpotBucket.controller";
import { HotSpotsServiceFactory } from "./hotSpots.service";
import { HotSpotsController } from "./hotSpots.controller";

angular.module('xr.hotSpots', ['xr.core'])
    .controller('EditHotSpotBucketController', EditHotSpotBucketController)
    .factory('HotSpotsService', HotSpotsServiceFactory)
    .controller('HotSpotsController', HotSpotsController);
