
var CreateOutcomePage = function () {

    this.outcome1InputField = element(by.model('$ctrl.outcome1'));
    this.outcome2InputField = element(by.model('$ctrl.outcome2'));
    this.outcome3InputField = element(by.model('$ctrl.outcome3'));

    this.saveButton = element(by.cssContainingText('button', 'Save'));

    this.relatedEntries = element.all(by.repeater('relatedEntry in $ctrl.relatedEntries'));
};

module.exports = CreateOutcomePage;