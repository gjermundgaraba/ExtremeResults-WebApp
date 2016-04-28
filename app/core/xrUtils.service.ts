
import IFilterService = angular.IFilterService;


export class XrUtils {
    static $inject = ['$filter', 'moment'];
    
    constructor(private $filter: IFilterService, private moment) {}
    
    getFormattedEntryDate(entry, optionalDate?): string {
        var date = optionalDate || entry.effectiveDate;

        var formattedEntryDate;

        switch (entry.typeName) {
            case 'Daily':
                formattedEntryDate = this.$filter('date')(date);
                break;
            case 'Weekly':
                formattedEntryDate = 'Week ' + this.moment(date).isoWeek();
                break;
            case 'Monthly':
                formattedEntryDate = this.moment.months()[this.moment(date).month()];
                break;
            default:
                formattedEntryDate = '';
        }

        return formattedEntryDate;
    }

    getEntryHeader(entry): string {
        return entry.typeName + ' ' + entry.className;
    }
}