import angular from "angular";
import IDialogService = angular.material.IDialogService;

import {XrUtils} from "../../core/xrUtils.service";

export class ReflectionEntryController {
    static $inject = ['XrUtils', '$mdDialog'];

    header: string;
    reflectionTime: string;
    reflectionObj;
    deleteDelegate;

    constructor(xrUtils: XrUtils, private $mdDialog: IDialogService) {
        this.header = xrUtils.getEntryHeader(this.reflectionObj);
        this.reflectionTime = xrUtils.getFormattedEntryDate(this.reflectionObj);
    }

    editReflection() {
        var reflectionCopy = {};
        angular.copy(this.reflectionObj, reflectionCopy);
        this.$mdDialog.show({
            controller: 'EditReflectionEntryController',
            controllerAs: '$ctrl',
            bindToController: true,
            templateUrl: 'entry/reflectionEntry/editReflectionEntry/editReflectionEntry.partial.html',
            parent: angular.element(document.body),
            locals: {
                deleteCallback: () => {
                    this.deleteDelegate.delete(this.reflectionObj);
                },
                updateCallback: (updatedReflection) => {
                    this.reflectionObj = updatedReflection;
                },
                reflection: reflectionCopy
            },
            clickOutsideToClose: true
        });
    }
} 