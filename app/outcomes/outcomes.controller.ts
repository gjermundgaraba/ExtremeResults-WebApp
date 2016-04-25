export class OutcomesController {
    showCreateOutcome:boolean = false;
    outcomeType = {
        className: 'Outcome',
        typeName: 'Daily'
    };

    createOutcome(typeName:string):void {
        this.showCreateOutcome = true;
        this.outcomeType.typeName = typeName;
    }
}