System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var EditReflectionEntryService;
    return {
        setters:[],
        execute: function() {
            EditReflectionEntryService = (function () {
                function EditReflectionEntryService(Urls, $http) {
                    this.Urls = Urls;
                    this.$http = $http;
                }
                EditReflectionEntryService.prototype.editReflection = function (objectId, outcome) {
                    return this.$http.put(this.Urls.baseApi + 'reflections/' + objectId, outcome);
                };
                EditReflectionEntryService.$inject = ['Urls', '$http'];
                return EditReflectionEntryService;
            }());
            exports_1("EditReflectionEntryService", EditReflectionEntryService);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9lbnRyeS9yZWZsZWN0aW9uRW50cnkvZWRpdFJlZmxlY3Rpb25FbnRyeS9lZGl0UmVmbGVjdGlvbkVudHJ5LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztZQUVBO2dCQUdJLG9DQUFvQixJQUFJLEVBQVUsS0FBa0I7b0JBQWhDLFNBQUksR0FBSixJQUFJLENBQUE7b0JBQVUsVUFBSyxHQUFMLEtBQUssQ0FBYTtnQkFBRyxDQUFDO2dCQUV4RCxtREFBYyxHQUFkLFVBQWUsUUFBUSxFQUFFLE9BQU87b0JBQzVCLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxjQUFjLEdBQUcsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDO2dCQUNsRixDQUFDO2dCQU5NLGtDQUFPLEdBQUcsQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7Z0JBT3ZDLGlDQUFDO1lBQUQsQ0FSQSxBQVFDLElBQUE7WUFSRCxtRUFRQyxDQUFBIiwiZmlsZSI6ImFwcC9lbnRyeS9yZWZsZWN0aW9uRW50cnkvZWRpdFJlZmxlY3Rpb25FbnRyeS9lZGl0UmVmbGVjdGlvbkVudHJ5LnNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgSUh0dHBTZXJ2aWNlID0gYW5ndWxhci5JSHR0cFNlcnZpY2U7XG5cbmV4cG9ydCBjbGFzcyBFZGl0UmVmbGVjdGlvbkVudHJ5U2VydmljZSB7XG4gICAgc3RhdGljICRpbmplY3QgPSBbJ1VybHMnLCAnJGh0dHAnXTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgVXJscywgcHJpdmF0ZSAkaHR0cDpJSHR0cFNlcnZpY2UpIHt9XG5cbiAgICBlZGl0UmVmbGVjdGlvbihvYmplY3RJZCwgb3V0Y29tZSkge1xuICAgICAgICByZXR1cm4gdGhpcy4kaHR0cC5wdXQodGhpcy5VcmxzLmJhc2VBcGkgKyAncmVmbGVjdGlvbnMvJyArIG9iamVjdElkLCBvdXRjb21lKTtcbiAgICB9XG59Il0sInNvdXJjZVJvb3QiOiIvaG9tZS9iamFhbmVzL0lkZWFQcm9qZWN0cy9FeHRyZW1lUmVzdWx0cy1XZWJBcHAifQ==
