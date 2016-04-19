ReflectionEntryController.$inject = ['XrUtils'];

function ReflectionEntryController(XrUtils) {
    var $ctrl = this;

    $ctrl.header = XrUtils.getEntryHeader($ctrl.reflectionObj);
    $ctrl.reflectionTime = XrUtils.getFormattedEntryDate($ctrl.reflectionObj);
}

export {ReflectionEntryController};