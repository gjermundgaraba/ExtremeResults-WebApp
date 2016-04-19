import angular from "angular";

import { CoreTypes } from "./coreTypes.constants";
import { Urls } from "./urls.constants";
import { XrUtilsFactory } from "./xrUtils.service";


angular.module('xr.core', [])
    .constant('CoreTypes', CoreTypes)
    .constant('Urls', Urls)
    .factory('XrUtils', XrUtilsFactory);