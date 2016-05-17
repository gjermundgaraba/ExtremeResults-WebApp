
import {entryListComponent} from "./entryList.directive";
import "../overview/overview.module.js";
import {EntryListController} from "./entryList.controller";
import {EntryListService} from "./entryList.service";

angular
    .module('xr.entryList', ['xr.overview'])
    .service('EntryListService', EntryListService)
    .controller('EntryListController', EntryListController)
    .component('entryList', entryListComponent);
