function deleteRoom($state) {
    'use strict';

    return {
      restrict: 'E',
      scope: {
        entity: '&',
        entityName: '@',
        entry: '&'
      },
      link: function (scope, element, attrs) {
        scope.gotoDelete = () => {
          var entityName = scope.entity() ? scope.entity().name() : attrs.entityName;
          var params = entityName == $state.params.entity ? $state.params : {};
          params.entity = entityName;
          params.id = scope.entry().identifierValue;
          $state.go($state.get('delete'), params);
        }
      },
      template: `<a class="btn btn-default btn-xs" ng-click="gotoDelete()"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span>&nbsp;Borrar</a>`
    };
}

deleteRoom.$inject = ['$state'];

export default deleteRoom;
