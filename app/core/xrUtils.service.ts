
export class XrUtils {
    static $inject = ['$filter', 'moment'];
    
    constructor(private $filter, private moment) {}
    
    getFormattedEntryDate(entry, optionalDate) {
        var date = optionalDate || entry.effectiveDate;

        switch (entry.typeName) {
            case 'Daily':
                return this.$filter('date')(date);
            case 'Weekly':
                return 'Week ' + this.moment(date).isoWeek();
            default:
                return '';

        }
    }

    getEntryHeader(entry) {
        return entry.typeName + ' ' + entry.className;
    }
}