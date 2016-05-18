import {XrUtils} from "../../../core/xrUtils.service";

export class ReflectionEntryController {
    static $inject = ['XrUtils'];
    
    header:string;
    reflectionTime:string;
    reflectionObj;
    
    constructor(xrUtils: XrUtils) {
        this.header = xrUtils.getEntryHeader(this.reflectionObj);
        this.reflectionTime = xrUtils.getFormattedEntryDate(this.reflectionObj); 
    }
} 