
var OverviewPage = function () {
    this.currentOutcomesHeader = element(by.cssContainingText('.md-toolbar-tools', 'Current Outcomes'));

    this.currentOutcomes = element.all(by.repeater('activeEntry in vm.activeEntries'));
    this.allEntries = element.all(by.repeater('entry in vm.overviewEntries'));

    this.titleFromCurrentOutcome = function (index) {
        return this.currentOutcomes.get(index).element(by.css('.entry-title'));
    };

    this.firstStoryFromCurrentOutcome = function (index) {
        return this.currentOutcomes.get(index).element(by.binding('vm.outcomeObj.firstStory'));
    };

    this.secondStoryFromCurrentOutcome = function (index) {
        return this.currentOutcomes.get(index).element(by.binding('vm.outcomeObj.secondStory'));
    };

    this.thirdStoryFromCurrentOutcome = function (index) {
        return this.currentOutcomes.get(index).element(by.binding('vm.outcomeObj.thirdStory'));
    };

    this.editCurrentOutcomeButton = function (index) {
        return this.currentOutcomes.get(index).element(by.css('[ng-click="vm.editOutcome()"]'));
    };

    this.downloadAllEntriesButton = element(by.css('[ng-click="vm.getAllEntries()"]'));
};

module.exports = OverviewPage;