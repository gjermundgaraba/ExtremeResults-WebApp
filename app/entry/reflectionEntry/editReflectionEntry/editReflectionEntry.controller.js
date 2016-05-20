System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var EditReflectionEntryController;
    return {
        setters:[],
        execute: function() {
            EditReflectionEntryController = (function () {
                function EditReflectionEntryController($mdDialog, xrUtils, editReflectionEntryService) {
                    this.$mdDialog = $mdDialog;
                    this.editReflectionEntryService = editReflectionEntryService;
                    this.saving = false;
                    this.header = xrUtils.getEntryHeader(this.reflection) + ' for ' + xrUtils.getFormattedEntryDate(this.reflection);
                }
                EditReflectionEntryController.prototype.save = function () {
                    var _this = this;
                    if (!this.saving && this.editReflectionForm.$valid) {
                        this.saving = true;
                        var updateObject = {
                            typeName: this.reflection.typeName,
                            firstThingThatWentWell: this.reflection.firstThingThatWentWell,
                            secondThingThatWentWell: this.reflection.secondThingThatWentWell,
                            thirdThingThatWentWell: this.reflection.thirdThingThatWentWell,
                            firstThingToImprove: this.reflection.firstThingToImprove,
                            secondThingToImprove: this.reflection.secondThingToImprove,
                            thirdThingToImprove: this.reflection.thirdThingToImprove,
                            effectiveDate: this.reflection.effectiveDate,
                        };
                        this.editReflectionEntryService.editReflection(this.reflection.objectId, updateObject)
                            .then(function () {
                            _this.$mdDialog.hide(_this.reflection);
                        })
                            .finally(function () {
                            _this.saving = false;
                        });
                    }
                };
                ;
                EditReflectionEntryController.$inject = ['$mdDialog', 'XrUtils', 'EditReflectionEntryService'];
                return EditReflectionEntryController;
            }());
            exports_1("EditReflectionEntryController", EditReflectionEntryController);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9lbnRyeS9yZWZsZWN0aW9uRW50cnkvZWRpdFJlZmxlY3Rpb25FbnRyeS9lZGl0UmVmbGVjdGlvbkVudHJ5LmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztZQU1BO2dCQVFJLHVDQUFvQixTQUF5QixFQUFFLE9BQWdCLEVBQVUsMEJBQXNEO29CQUEzRyxjQUFTLEdBQVQsU0FBUyxDQUFnQjtvQkFBNEIsK0JBQTBCLEdBQTFCLDBCQUEwQixDQUE0QjtvQkFKL0gsV0FBTSxHQUFZLEtBQUssQ0FBQztvQkFLcEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxPQUFPLEdBQUcsT0FBTyxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDckgsQ0FBQztnQkFFRCw0Q0FBSSxHQUFKO29CQUFBLGlCQXdCSDtvQkF2QkcsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO3dCQUNqRCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQzt3QkFDbkIsSUFBSSxZQUFZLEdBQUc7NEJBQ2YsUUFBUSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUTs0QkFDbEMsc0JBQXNCLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxzQkFBc0I7NEJBQzlELHVCQUF1QixFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsdUJBQXVCOzRCQUNoRSxzQkFBc0IsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLHNCQUFzQjs0QkFDOUQsbUJBQW1CLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxtQkFBbUI7NEJBQ3hELG9CQUFvQixFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsb0JBQW9COzRCQUMxRCxtQkFBbUIsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLG1CQUFtQjs0QkFDeEQsYUFBYSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYTt5QkFDL0MsQ0FBQzt3QkFFRixJQUFJLENBQUMsMEJBQTBCLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLFlBQVksQ0FBQzs2QkFDakYsSUFBSSxDQUFDOzRCQUNGLEtBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQzt3QkFDekMsQ0FBQyxDQUFDOzZCQUNELE9BQU8sQ0FBQzs0QkFDTCxLQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQzt3QkFDeEIsQ0FBQyxDQUFDLENBQUM7b0JBQ1gsQ0FBQztnQkFHTCxDQUFDOztnQkFuQ1UscUNBQU8sR0FBRyxDQUFDLFdBQVcsRUFBRSxTQUFTLEVBQUUsNEJBQTRCLENBQUMsQ0FBQztnQkFxQzVFLG9DQUFDO1lBQUQsQ0F0Q0EsQUFzQ0MsSUFBQTtZQXRDRCx5RUFzQ0MsQ0FBQSIsImZpbGUiOiJhcHAvZW50cnkvcmVmbGVjdGlvbkVudHJ5L2VkaXRSZWZsZWN0aW9uRW50cnkvZWRpdFJlZmxlY3Rpb25FbnRyeS5jb250cm9sbGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IElEaWFsb2dTZXJ2aWNlID0gYW5ndWxhci5tYXRlcmlhbC5JRGlhbG9nU2VydmljZTtcblxuaW1wb3J0IHtYclV0aWxzfSBmcm9tIFwiLi4vLi4vLi4vY29yZS94clV0aWxzLnNlcnZpY2VcIjtcbmltcG9ydCB7RWRpdFJlZmxlY3Rpb25FbnRyeVNlcnZpY2V9IGZyb20gXCIuL2VkaXRSZWZsZWN0aW9uRW50cnkuc2VydmljZVwiO1xuaW1wb3J0IElGb3JtQ29udHJvbGxlciA9IGFuZ3VsYXIuSUZvcm1Db250cm9sbGVyO1xuXG5leHBvcnQgY2xhc3MgRWRpdFJlZmxlY3Rpb25FbnRyeUNvbnRyb2xsZXIge1xuICAgIHN0YXRpYyAkaW5qZWN0ID0gWyckbWREaWFsb2cnLCAnWHJVdGlscycsICdFZGl0UmVmbGVjdGlvbkVudHJ5U2VydmljZSddO1xuXG4gICAgZWRpdFJlZmxlY3Rpb25Gb3JtOiBJRm9ybUNvbnRyb2xsZXI7XG4gICAgc2F2aW5nOiBib29sZWFuID0gZmFsc2U7XG4gICAgaGVhZGVyOiBzdHJpbmc7XG4gICAgcmVmbGVjdGlvbjtcbiAgICBcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlICRtZERpYWxvZzogSURpYWxvZ1NlcnZpY2UsIHhyVXRpbHM6IFhyVXRpbHMsIHByaXZhdGUgZWRpdFJlZmxlY3Rpb25FbnRyeVNlcnZpY2U6IEVkaXRSZWZsZWN0aW9uRW50cnlTZXJ2aWNlKSB7XG4gICAgICAgIHRoaXMuaGVhZGVyID0geHJVdGlscy5nZXRFbnRyeUhlYWRlcih0aGlzLnJlZmxlY3Rpb24pICsgJyBmb3IgJyArIHhyVXRpbHMuZ2V0Rm9ybWF0dGVkRW50cnlEYXRlKHRoaXMucmVmbGVjdGlvbik7XG4gICAgfVxuXG4gICAgc2F2ZSgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuc2F2aW5nICYmIHRoaXMuZWRpdFJlZmxlY3Rpb25Gb3JtLiR2YWxpZCkge1xuICAgICAgICB0aGlzLnNhdmluZyA9IHRydWU7XG4gICAgICAgIHZhciB1cGRhdGVPYmplY3QgPSB7XG4gICAgICAgICAgICB0eXBlTmFtZTogdGhpcy5yZWZsZWN0aW9uLnR5cGVOYW1lLFxuICAgICAgICAgICAgZmlyc3RUaGluZ1RoYXRXZW50V2VsbDogdGhpcy5yZWZsZWN0aW9uLmZpcnN0VGhpbmdUaGF0V2VudFdlbGwsXG4gICAgICAgICAgICBzZWNvbmRUaGluZ1RoYXRXZW50V2VsbDogdGhpcy5yZWZsZWN0aW9uLnNlY29uZFRoaW5nVGhhdFdlbnRXZWxsLFxuICAgICAgICAgICAgdGhpcmRUaGluZ1RoYXRXZW50V2VsbDogdGhpcy5yZWZsZWN0aW9uLnRoaXJkVGhpbmdUaGF0V2VudFdlbGwsXG4gICAgICAgICAgICBmaXJzdFRoaW5nVG9JbXByb3ZlOiB0aGlzLnJlZmxlY3Rpb24uZmlyc3RUaGluZ1RvSW1wcm92ZSxcbiAgICAgICAgICAgIHNlY29uZFRoaW5nVG9JbXByb3ZlOiB0aGlzLnJlZmxlY3Rpb24uc2Vjb25kVGhpbmdUb0ltcHJvdmUsXG4gICAgICAgICAgICB0aGlyZFRoaW5nVG9JbXByb3ZlOiB0aGlzLnJlZmxlY3Rpb24udGhpcmRUaGluZ1RvSW1wcm92ZSxcbiAgICAgICAgICAgIGVmZmVjdGl2ZURhdGU6IHRoaXMucmVmbGVjdGlvbi5lZmZlY3RpdmVEYXRlLFxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuZWRpdFJlZmxlY3Rpb25FbnRyeVNlcnZpY2UuZWRpdFJlZmxlY3Rpb24odGhpcy5yZWZsZWN0aW9uLm9iamVjdElkLCB1cGRhdGVPYmplY3QpXG4gICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy4kbWREaWFsb2cuaGlkZSh0aGlzLnJlZmxlY3Rpb24pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5maW5hbGx5KCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnNhdmluZyA9IGZhbHNlO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG5cbn07XG5cbn0gIl0sInNvdXJjZVJvb3QiOiIvaG9tZS9iamFhbmVzL0lkZWFQcm9qZWN0cy9FeHRyZW1lUmVzdWx0cy1XZWJBcHAifQ==
