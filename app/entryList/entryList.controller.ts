import {EntryListService} from "./entryList.service";
import IPromise = angular.IPromise;

export class EntryListController {
    static $inject = ['EntryListService'];

    public fetchEntryListPromise: IPromise<any>;
    public entryList: Array<any> = [];

    private loading: boolean = true;
    private showLoadMore: boolean = true;
    private className: string;

    deleteDelegate = {
        delete: (entry) => {
            this.deleteCallback(entry);
        }
    };

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
            controller.loading = false;

            if (entries.length === 0) {
                controller.showLoadMore = false;
            }
            
            controller.entryList = entries;
        }
    }

    fetchMore() {
        this.loading = true;

        if (this.className === 'Outcome') {
            this.fetchEntryListPromise = this.entryListService.getOutcomes(this.entryList.length)
                .then(concatEntries);
        } else if (this.className === 'Reflection') {
            this.fetchEntryListPromise = this.entryListService.getReflections(this.entryList.length)
                .then(concatEntries);
        }

        var controller = this;
        function concatEntries(entries) {
            controller.loading = false;

            if (entries.length > 0) {
                controller.entryList = controller.entryList.concat(entries);
            } else {
                controller.showLoadMore = false;
            }

        }
    }

    showLoadMoreButton() {
        return !this.loading && this.showLoadMore;
    }

    deleteCallback(entry) {
        var indexOfEntry = this.entryList.indexOf(entry);

        if (indexOfEntry !== -1) {
            this.entryList.splice(indexOfEntry, 1);
        }
    }

}