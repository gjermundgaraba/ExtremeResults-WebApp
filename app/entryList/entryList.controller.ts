import {EntryListService} from "./entryList.service";
import IPromise = angular.IPromise;

export class EntryListController {
    static $inject = ['EntryListService'];

    public fetchEntryListPromise: IPromise<any>;
    public entryList = [];
    public showLoadMore = true;
    
    private className: string;

    constructor(private entryListService: EntryListService) {
        this.fetchEntries();
    }
    
    fetchEntries() {
        if (this.className === 'Outcome') {
            this.fetchEntryListPromise = this.entryListService.getOutcomes(0)
                .then(addEntries);
        } else if (this.className === 'Reflection') {
            this.fetchEntryListPromise = this.entryListService.getReflections(0)
                .then(addEntries);
        }

        var controller = this;
        function addEntries(entries) {
            controller.entryList = entries;
        }
    }

    fetchMore() {
        if (this.className === 'Outcome') {
            this.fetchEntryListPromise = this.entryListService.getOutcomes(this.entryList.length)
                .then(concatEntries);
        } else if (this.className === 'Reflection') {
            this.fetchEntryListPromise = this.entryListService.getReflections(this.entryList.length)
                .then(concatEntries);
        }

        var controller = this;
        function concatEntries(entries) {
            if (entries.length > 0) {
                controller.entryList = controller.entryList.concat(entries);
            } else {
                controller.showLoadMore = false;
            }

        }
    }

}