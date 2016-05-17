System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var EntryListController;
    return {
        setters:[],
        execute: function() {
            EntryListController = (function () {
                function EntryListController(entryListService) {
                    this.entryListService = entryListService;
                    this.entryList = [];
                    this.fetchEntries();
                }
                EntryListController.prototype.fetchEntries = function () {
                    var _this = this;
                    if (this.className === 'Outcome') {
                        this.fetchEntryListPromise = this.entryListService.getOutcomes()
                            .then(function (entries) {
                            _this.entryList = entries;
                        });
                    }
                    else if (this.className === 'Reflection') {
                        this.fetchEntryListPromise = this.entryListService.getReflections()
                            .then(function (entries) {
                            _this.entryList = entries;
                        });
                    }
                };
                EntryListController.$inject = ['EntryListService'];
                return EntryListController;
            }());
            exports_1("EntryListController", EntryListController);
        }
    }
});
//# sourceMappingURL=entryList.controller.js.map