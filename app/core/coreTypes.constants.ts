export interface ICoreType {
    className: string,
    typeName: string
}

export const CoreTypes: {mondayVision: ICoreType,dailyOutcome: ICoreType, weeklyReflection: ICoreType} = {
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
};