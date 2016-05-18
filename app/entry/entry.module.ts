import "../core/core.module";
import { EditOutcomeEntryService } from "./outcomeEntry/editOutcomeEntry/editOutcomeEntry.service";
import { EditOutcomeEntryController } from "./outcomeEntry/editOutcomeEntry/editOutcomeEntry.controller";
import { OutcomeEntryController } from "./outcomeEntry/outcomeEntry.controller";
import { outcomeEntryComponent } from "./outcomeEntry/outcomeEntry.directive";
import { ReflectionEntryController } from "./reflectionEntry/reflectionEntry.controller";
import { reflectionEntryComponent } from "./reflectionEntry/reflectionEntry.directive";
import { overviewEntryComponent } from "./entry.directive";

angular
    .module('xr.entry', ['xr.core'])
    .service('EditOutcomeEntryService', EditOutcomeEntryService)
    .controller('EditOutcomeEntryController', EditOutcomeEntryController)
    .controller('OutcomeEntryController', OutcomeEntryController)
    .component('outcomeEntry', outcomeEntryComponent)
    .controller('ReflectionEntryController', ReflectionEntryController)
    .component('reflectionEntry', reflectionEntryComponent)
    .component('overviewEntry', overviewEntryComponent);