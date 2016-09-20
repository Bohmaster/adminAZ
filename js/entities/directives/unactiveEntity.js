function unactiveEntity($http) {
    'use strict';

    return {
      restrict: 'E',
      scope: {
        entity: "&"
      },
      link: function(scope, elem, attrs) {

        var user_token = JSON.parse(localStorage.getItem('az_admin_login')).id;

        scope.entity = scope.entity().values;
        scope.deactiveEntity = function() {
          $http.post(urlBase + 'entities/activation?access_token=' + user_token, { entityId: scope.entity.id, activate: false })
          .success(function (data) {
            scope.entity.active = false;
          })
          .error(function(err) {
            console.error(err);
          });
        }
      },
      template:
        `<a class="btn btn-danger btn-xs" ng-click="deactiveEntity()">
          <span class="glyphicon glyphicon-remove-sign" aria-hidden="true"></span>&nbsp;Desactivar
        </a>`
    };
}

unactiveEntity.$inject = ['$http'];

export default unactiveEntity;
