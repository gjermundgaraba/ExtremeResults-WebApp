var RegisterPage = require('./register.po.js');
var OverviewPage = require('../overview/overview.po.js');
var Login = require('../login/login.po.js');
var Common = require('../common/common.js');

describe('Register Page', function () {

    var registerPage = new RegisterPage();
    var overviewPage = new OverviewPage();
    var login = new Login();
    var common = new Common();

    beforeAll(function () {
        common.clearDB();
        browser.driver.manage().deleteAllCookies();
    });

    beforeEach(function () {
        common.goHome();
        login.registerButton.click();
    });

    it('should got back to login when clicking on back to login button', function () {
        registerPage.backToLoginButton.click();

        expect(login.loginButton.isDisplayed()).toBe(true);
    });

    it('should show error message when username is not filled out', function () {
        registerPage.passwordInputField.sendKeys('herpaderpa');
        registerPage.registerButton.click();

        expect(registerPage.usernameErrorMessageField.getText()).toBe('This is required.');
    });

    it('should show error message when password is not filled out', function () {
        registerPage.usernameInputField.sendKeys('herpaderpa');
        registerPage.registerButton.click();

        expect(registerPage.passwordErrorMessageField.getText()).toBe('This is required.');
    });

    it('should login after register success', function () {
        registerPage.usernameInputField.sendKeys(common.generateRandomUsername());
        registerPage.passwordInputField.sendKeys('abcd1234&&%');
        registerPage.registerButton.click();

        expect(overviewPage.firstTimeHelp.isPresent()).toBe(true);
    });

});