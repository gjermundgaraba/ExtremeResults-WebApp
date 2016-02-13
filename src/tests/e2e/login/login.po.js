
var LoginPage = function () {
    this.loginButton = element(by.id('loginButton'));
    this.registerButton = element(by.css('[ng-click="$ctrl.register()"]'));

    this.setLoginUserName = function (userName) {
        element(by.model('$ctrl.username')).sendKeys(userName);
    };

    this.setPassword = function (password) {
        element(by.model('$ctrl.password')).sendKeys(password);
    };
};

module.exports = LoginPage;