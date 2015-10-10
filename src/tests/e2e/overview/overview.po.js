
var OverviewPage = function () {
    this.firstTimeHelp = element(by.css('first-time-help'));

    this.currentOutcomes = element.all(by.repeater('activeEntry in vm.activeEntries'));
    this.allEntries = element.all(by.repeater('entry in vm.overviewEntries'));
};

module.exports = OverviewPage;