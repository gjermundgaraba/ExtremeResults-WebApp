
var LoginPage = function () {
    this.loginButton = element(by.id('loginButton'));
    this.registerButton = element(by.css('[ng-click="vm.register()"]'));

    this.setLoginUserName = function (userName) {
        element(by.model('vm.username')).sendKeys(userName);
    };

    this.setPassword = function (password) {
        element(by.model('vm.password')).sendKeys(password);
    };
};

module.exports = LoginPage;