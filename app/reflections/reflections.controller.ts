ReflectionsController.$inject = [];

function ReflectionsController() {
    var $ctrl = this;
    $ctrl.showCreateReflection = false;
    $ctrl.reflectionType = {
        className: 'Reflection',
        typeName: 'Weekly'
    };

    $ctrl.createReflection = function (typeName) {
        $ctrl.showCreateReflection = true;
        $ctrl.reflectionType.typeName = typeName;
    }
}

export {ReflectionsController};