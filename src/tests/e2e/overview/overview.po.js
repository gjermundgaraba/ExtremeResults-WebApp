
var OverviewPage = function () {
    this.firstTimeHelp = element(by.css('first-time-help'));

    this.currentOutcomes = element.all(by.repeater('activeEntry in vm.activeEntries'));
    this.allEntries = element.all(by.repeater('entry in vm.overviewEntries'));

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
};

module.exports = OverviewPage;