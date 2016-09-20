function makeOwner() {
    'use strict';

    return {
      restrict: 'E',
      scope: {
        entity: "&"
      },
      link: function(scope, elem, attrs) {
        scope.entity = scope.entity();
        scope.status = attrs.status;
      },
      template: '<a class="btn btn-outline btn-success" ng-click="makeOwner()"><span class="glyphicon glyphicon-thumbs-up" aria-hidden="true"></span>&nbsp;Crear Dueño</a>',
    };
}

export default makeOwner;
