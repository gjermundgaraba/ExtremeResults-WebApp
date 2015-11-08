var CreateReflectionPage = require('../common/createReflection.po.js');
var OverviewPage = require('../overview/overview.po.js');
var Login = require('../login/login.po.js');
var Common = require('../common/common.js');

describe('Daily Outcome Page', function () {

    var createReflectionPage = new CreateReflectionPage();
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

    beforeEach(function () {
        common.goHome();
        common.weeklyReflectionMenuButton.click();
    });

    it('should be able to create a new daily outcome', function () {
        createReflectionPage.firstThingThatWentWellInputField.sendKeys('First thing that went well');
        createReflectionPage.secondThingThatWentWellInputField.sendKeys('Second thing that went well');
        createReflectionPage.thirdThingThatWentWellInputField.sendKeys('Third thing that went well');
        createReflectionPage.firstThingToImproveInputField.sendKeys('First thing to improve');
        createReflectionPage.secondThingToImproveInputField.sendKeys('First thing to improve');
        createReflectionPage.thirdThingToImproveInputField.sendKeys('First thing to improve');

        createReflectionPage.saveButton.click();

        common.overviewMenuButton.click();

        expect(overviewPage.allEntries.count()).toBe(1);

    });

});