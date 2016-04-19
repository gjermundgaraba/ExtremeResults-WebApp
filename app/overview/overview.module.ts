import "../core/core.module";
import { EditOutcomeEntryServiceFactory } from "./entry/outcomeEntry/editOutcomeEntry/editOutcomeEntry.service";
import { EditOutcomeEntryControllerFactory } from "./entry/outcomeEntry/editOutcomeEntry/editOutcomeEntry.controller";
import { OutcomeEntryController } from "./entry/outcomeEntry/outcomeEntry.controller";
import { outcomeEntryComponent } from "./entry/outcomeEntry/outcomeEntry.directive";
import { ReflectionEntryController } from "./entry/reflectionEntry/reflectionEntry.controller";
import { reflectionEntryComponent } from "./entry/reflectionEntry/reflectionEntry.directive";
import { overviewEntryComponent } from "./entry/entry.directive";
import { OverviewServiceFactory } from "./overview.service";
import { OverviewController } from "./overview.controller";

angular
    .module('xr.overview', ['xr.core'])
    .factory('EditOutcomeEntryService', EditOutcomeEntryServiceFactory)
    .controller('EditOutcomeEntryController', EditOutcomeEntryControllerFactory)
    .controller('OutcomeEntryController', OutcomeEntryController)
    .component('outcomeEntry', outcomeEntryComponent)
    .controller('ReflectionEntryController', ReflectionEntryController)
    .component('reflectionEntry', reflectionEntryComponent)
    .component('overviewEntry', overviewEntryComponent)
    .factory('OverviewService', OverviewServiceFactory)
    .controller('OverviewController', OverviewController);