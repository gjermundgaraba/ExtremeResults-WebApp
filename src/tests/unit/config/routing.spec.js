(function () {
    'use strict';

    describe('ParseKeyServiceProvider Config', function () {
        var stateProvider,
            stateProviderData,
            urlRouterProvider,
            urlRouterProviderOtherwiseMethod,
            state,
            CoreTypes;

        beforeEach(function () {
            module('ui.router', function ($stateProvider, $urlRouterProvider) {
                stateProvider = $stateProvider;
                urlRouterProvider = $urlRouterProvider;

                stateProviderData = {};

                spyOn($stateProvider, 'state').and.callFake(function (stateName, stateConfig) {
                    stateProviderData[stateName] = stateConfig;
                    return $stateProvider;
                });

                spyOn($urlRouterProvider, 'otherwise').and.callFake(function (func) {
                    urlRouterProviderOtherwiseMethod = func;
                });
            });
        });
        beforeEach(module('xr.config'));

        // Kick off the above function
        beforeEach(inject(function (_CoreTypes_) {
            CoreTypes = _CoreTypes_;
        }));

        it('should got to overview state when state on otherwise', function () {
            var stateNameCalled;
            var stateMock = {
                go: function (stateName) {
                    stateNameCalled = stateName;
                }
            };
            var injectorMock = {
                get: function () {
                    return stateMock;
                }
            };
            urlRouterProviderOtherwiseMethod(injectorMock);

            expect(stateNameCalled).toBe('app.overview');
        });

        it('should resolve correct outcome type for app.daily-outcome', function () {
            expect(stateProviderData['app.daily-outcome'].resolve.outcomeType()).toBe(CoreTypes.dailyOutcome);
        });

        it('should resolve correct outcome type for app.monday-vision', function () {
            expect(stateProviderData['app.monday-vision'].resolve.outcomeType()).toBe(CoreTypes.mondayVision)
        });

        it('should resolve correct outcome type for app.weekly-reflection', function () {
            expect(stateProviderData['app.weekly-reflection'].resolve.reflectionType()).toBe(CoreTypes.weeklyReflection)
        });
    });

})();