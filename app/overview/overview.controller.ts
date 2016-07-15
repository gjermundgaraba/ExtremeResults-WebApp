import {OverviewService} from "./overview.service";
import IPromise = angular.IPromise;

export class OverviewController {

    static $inject = ['OverviewService'];

    getActiveEntriesPromise: IPromise<any>;
    activeEntries = [];
    allEntriesLoaded: boolean = false;
    loaded: boolean = false;

    deleteDelegate = {
        delete: (entry) => {
            this.deleteCallback(entry);
        }
    };

    constructor(overviewService: OverviewService) {
        this.getActiveEntriesPromise = overviewService.getActiveEntries()
            .then((data) => {
                this.activeEntries = data;
                this.loaded = true;
            });
    }

    deleteCallback(entry) {
        var indexOfEntry = this.activeEntries.indexOf(entry);

        if (indexOfEntry !== -1) {
            this.activeEntries.splice(indexOfEntry, 1);
        }
    }
}