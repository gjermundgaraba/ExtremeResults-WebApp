import angular from "angular";

import "../core/core.module";
import { ReflectionsController } from "./reflections.controller";
import { CreateReflectionServiceFactory } from "./createReflection/createReflection.service";
import { CreateReflectionController } from "./createReflection/createReflection.controller";
import { createReflectionComponent } from "./createReflection/createReflection.directive";

angular.module('xr.reflections', ['xr.core', 'ngMessages'])
    .factory('CreateReflectionService', CreateReflectionServiceFactory)
    .controller('CreateReflectionController', CreateReflectionController)
    .component('xrCreateReflection', createReflectionComponent)
    .controller('ReflectionsController', ReflectionsController);
