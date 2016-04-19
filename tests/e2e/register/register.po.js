
var RegisterPage = function () {
    this.registerButton = element(by.id('registerButton'));
    this.backToLoginButton = element(by.css('[ng-click="$ctrl.backToLogin()"]'));

    this.usernameInputField = element(by.model('$ctrl.username'));
    this.passwordInputField = element(by.model('$ctrl.password'));

    this.usernameErrorMessageField = this.usernameInputField.element(by.xpath('..')).element(by.css('[ng-messages]')).element(by.xpath('*[1]'));
    this.passwordErrorMessageField = this.passwordInputField.element(by.xpath('..')).element(by.css('[ng-messages]')).element(by.xpath('*[1]'));
};

module.exports = RegisterPage;