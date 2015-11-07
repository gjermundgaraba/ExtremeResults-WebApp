
var CreateOutcomePage = function () {

    this.outcome1InputField = element(by.model('vm.outcome1'));
    this.outcome2InputField = element(by.model('vm.outcome2'));
    this.outcome3InputField = element(by.model('vm.outcome3'));

    this.saveButton = element(by.cssContainingText('button', 'Save'));
};

module.exports = CreateOutcomePage;