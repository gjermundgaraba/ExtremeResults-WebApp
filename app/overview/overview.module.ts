import "../core/core.module";
import { EditOutcomeEntryService } from "./entry/outcomeEntry/editOutcomeEntry/editOutcomeEntry.service";
import { EditOutcomeEntryController } from "./entry/outcomeEntry/editOutcomeEntry/editOutcomeEntry.controller";
import { OutcomeEntryController } from "./entry/outcomeEntry/outcomeEntry.controller";
import { outcomeEntryComponent } from "./entry/outcomeEntry/outcomeEntry.directive";
import { ReflectionEntryController } from "./entry/reflectionEntry/reflectionEntry.controller";
import { reflectionEntryComponent } from "./entry/reflectionEntry/reflectionEntry.directive";
import { overviewEntryComponent } from "./entry/entry.directive";
import { OverviewService } from "./overview.service";
import { OverviewController } from "./overview.controller";

angular
    .module('xr.overview', ['xr.core'])
    .service('EditOutcomeEntryService', EditOutcomeEntryService)
    .controller('EditOutcomeEntryController', EditOutcomeEntryController)
    .controller('OutcomeEntryController', OutcomeEntryController)
    .component('outcomeEntry', outcomeEntryComponent)
    .controller('ReflectionEntryController', ReflectionEntryController)
    .component('reflectionEntry', reflectionEntryComponent)
    .component('overviewEntry', overviewEntryComponent)
    .service('OverviewService', OverviewService)
    .controller('OverviewController', OverviewController);