import {OverviewService} from "./overview.service";
import IPromise = angular.IPromise;

export class OverviewController {
    static $inject = ['OverviewService'];

    getActiveEntriesPromise: IPromise<any>;
    activeEntries = [];
    overviewEntries = [];
    allEntriesLoaded: boolean = false;

    constructor(overviewService: OverviewService) {
        this.getActiveEntriesPromise = overviewService.getActiveEntries()
            .then((data) => {
                this.activeEntries = data;
            });
    }
}