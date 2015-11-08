var OverviewPage = require('./overview.po.js');
var Login = require('../login/login.po.js');
var Common = require('../common/common.js');

describe('Overview Page', function () {

    var overviewPage = new OverviewPage();
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

    it('should have a help section when there are no entries', function () {
        expect(overviewPage.firstTimeHelp.isPresent()).toBe(true);
    });

});