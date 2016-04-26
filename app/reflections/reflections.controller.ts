import {ICoreType} from "../core/coreTypes.constants";

export class ReflectionsController {

    showCreateReflection = false;
    reflectionType: ICoreType = {
        className: 'Reflection',
        typeName: 'Weekly'
    };

    createReflection(typeName: string): void {
        this.showCreateReflection = true;
        this.reflectionType.typeName = typeName;
    }
}