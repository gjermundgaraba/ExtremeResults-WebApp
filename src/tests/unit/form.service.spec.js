describe('FormService', function () {
    var FormService,
        mockForm;

    beforeEach(module('xr.core'));
    beforeEach(function () {
        mockForm = {
            '$angularProperty': {},
            'outcome1': { $pristine: true, $valid: true, $setDirty: function() {} },
            'outcome2': { $pristine: true, $valid: true, $setDirty: function() {} },
            'outcome3': { $pristine: true, $valid: true, $setDirty: function() {} }
        };


        spyOn(mockForm.outcome1, '$setDirty');
        spyOn(mockForm.outcome2, '$setDirty');
        spyOn(mockForm.outcome3, '$setDirty');
    });
    beforeEach(inject(function (_FormService_) {
        FormService = _FormService_;
    }));

    describe('setAllFieldsToDirty', function () {
        it('should set all normal fields to dirty', function() {
            FormService.setAllFieldsToDirty(mockForm);

            expect(mockForm.outcome1.$setDirty).toHaveBeenCalled();
            expect(mockForm.outcome2.$setDirty).toHaveBeenCalled();
            expect(mockForm.outcome3.$setDirty).toHaveBeenCalled();
        });
    });

    describe('allFieldsAreValid', function () {
        it('should return true when all fields are valid', function() {
            var returnValue = FormService.allFieldsAreValid(mockForm);

            expect(returnValue).toBe(true);
        });

        it('should return false when some fields are invalid', function() {
            mockForm.outcome1.$valid = false;

            var returnValue = FormService.allFieldsAreValid(mockForm);

            expect(returnValue).toBe(false);
        });
    });
});
