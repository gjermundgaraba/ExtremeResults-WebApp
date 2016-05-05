var Login = require('../login/login.po.js');
var Common = require('../common/common.js');

describe('Register Page', function () {

    var login = new Login();
    var common = new Common();

    beforeAll(function () {
        common.clearDB();
        browser.driver.manage().deleteAllCookies();

        common.goHome();
        login.setLoginUserName('bjaanes');
        login.setPassword('1234');
        login.loginButton.click();
        browser.waitForAngular();
    });

    it('should log you out when clicking on the logout button', function () {
        common.logoutButton.click();

        expect(login.loginButton.isDisplayed()).toBe(true);
    });
});