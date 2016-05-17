import {EntryListService} from "./entryList.service";
import IPromise = angular.IPromise;

export class EntryListController {
    static $inject = ['EntryListService'];

    public fetchEntryListPromise: IPromise<any>;
    public entryList = [];
    
    private className: string;

    constructor(private entryListService: EntryListService) {
        this.fetchEntries();
    }
    
    fetchEntries() {
        if (this.className === 'Outcome') {
            this.fetchEntryListPromise = this.entryListService.getOutcomes()
                .then(entries => {
                    this.entryList = entries;
                });
        } else if (this.className === 'Reflection') {
            this.fetchEntryListPromise = this.entryListService.getReflections()
                .then(entries => {
                    this.entryList = entries;
                });
        }
    }

}