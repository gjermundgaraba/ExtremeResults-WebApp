
var OutcomesPage = function () {

    this.createNewOutcomeButton = element(by.buttonText('Create New Outcome'));
    this.createNewOutcomeDailyOutcomeSubChoiceButton = element(by.buttonText('Daily Outcome')); 
    this.createNewOutcomeWeeklyOutcomeSubChoiceButton = element(by.buttonText('Weekly Outcome')); 
    this.createNewOutcomeMonthlyOutcomeSubChoiceButton = element(by.buttonText('Monthly Outcome'));

    this.outcome1InputField = element(by.model('$ctrl.outcome1'));
    this.outcome2InputField = element(by.model('$ctrl.outcome2'));
    this.outcome3InputField = element(by.model('$ctrl.outcome3'));

    this.saveButton = element(by.cssContainingText('button', 'Save'));

    this.relatedEntries = element.all(by.repeater('relatedEntry in $ctrl.relatedEntries'));
};

module.exports = OutcomesPage;