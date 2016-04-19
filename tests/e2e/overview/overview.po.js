
var OverviewPage = function () {
    this.currentOutcomesHeader = element(by.cssContainingText('.md-toolbar-tools', 'Current Outcomes'));

    this.currentOutcomes = element.all(by.repeater('activeEntry in $ctrl.activeEntries'));
    this.allEntries = element.all(by.repeater('entry in $ctrl.overviewEntries'));

    this.titleFromCurrentOutcome = function (index) {
        return this.currentOutcomes.get(index).element(by.css('.entry-title'));
    };

    this.firstStoryFromCurrentOutcome = function (index) {
        return this.currentOutcomes.get(index).element(by.binding('$ctrl.outcomeObj.firstStory'));
    };

    this.secondStoryFromCurrentOutcome = function (index) {
        return this.currentOutcomes.get(index).element(by.binding('$ctrl.outcomeObj.secondStory'));
    };

    this.thirdStoryFromCurrentOutcome = function (index) {
        return this.currentOutcomes.get(index).element(by.binding('$ctrl.outcomeObj.thirdStory'));
    };

    this.editCurrentOutcomeButton = function (index) {
        return this.currentOutcomes.get(index).element(by.css('[ng-click="$ctrl.editOutcome()"]'));
    };

    this.downloadAllEntriesButton = element(by.css('[ng-click="$ctrl.getAllEntries()"]'));
};

module.exports = OverviewPage;