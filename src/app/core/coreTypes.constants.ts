namespace xrApp {

    angular
        .module('xr.core')
        .constant('CoreTypes', {
            mondayVision: {
                className: 'Outcome',
                typeName: 'Weekly'
            },
            dailyOutcome: {
                className: 'Outcome',
                typeName: 'Daily'
            },
            weeklyReflection: {
                className: 'Reflection',
                typeName: 'Weekly'
            }
        });
}