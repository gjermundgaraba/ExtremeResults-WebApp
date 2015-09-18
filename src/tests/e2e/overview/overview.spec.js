var OverviewPage = require('./overview.po.js');
var Common = require('../common/common.js');

describe('Overview Page', function () {

    var overviewPage = new OverviewPage();
    var common = new Common();

    beforeAll(function () {
        common.clearDB();
    });

    beforeEach(function () {
        browser.get(browser.params.client);
    });

    it('should have a help section when there are no entries', function () {
        browser.get(browser.params.client);
        expect(overviewPage.firstTimeHelp.isPresent()).toBe(true);
    });

});