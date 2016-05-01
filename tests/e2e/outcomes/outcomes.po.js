
var OutcomesPage = function () {
    
    this.outcomeHeader = element(by.cssContainingText('h1', 'Outcomes'));

    this.createNewOutcomeButton = element(by.buttonText('Create New Outcome'));
    this.createNewOutcomeDailyOutcomeSubChoiceButton = element(by.buttonText('Daily Outcome')); 
    this.createNewOutcomeWeeklyOutcomeSubChoiceButton = element(by.buttonText('Weekly Outcome')); 
    this.createNewOutcomeMonthlyOutcomeSubChoiceButton = element(by.buttonText('Monthly Outcome'));

    this.outcome1InputField = element(by.model('$ctrl.outcome1'));
    this.outcome1InputFieldMessage = this.outcome1InputField.element(by.xpath('..')).element(by.css('[ng-messages]')).element(by.xpath('*[1]'));

    this.outcome2InputField = element(by.model('$ctrl.outcome2'));
    this.outcome2InputFieldMessage = this.outcome2InputField.element(by.xpath('..')).element(by.css('[ng-messages]')).element(by.xpath('*[1]'));

    this.outcome3InputField = element(by.model('$ctrl.outcome3'));
    this.outcome3InputFieldMessage = this.outcome3InputField.element(by.xpath('..')).element(by.css('[ng-messages]')).element(by.xpath('*[1]'));

    this.saveButton = element(by.cssContainingText('button', 'Save'));

    this.relatedEntries = element.all(by.repeater('relatedEntry in $ctrl.relatedEntries'));
};

module.exports = OutcomesPage;